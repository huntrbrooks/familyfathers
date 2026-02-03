import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifySession } from "@/lib/auth";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const PDF_TYPES = ["application/pdf"];
const ALL_ALLOWED_TYPES = [...IMAGE_TYPES, ...PDF_TYPES];

export async function POST(request: NextRequest) {
  try {
    // Check if BLOB_READ_WRITE_TOKEN is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error: Blob storage not configured" },
        { status: 500 }
      );
    }

    // Verify authentication
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALL_ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, GIF, WebP, and PDF are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB for images, 10MB for PDFs)
    const isPDF = PDF_TYPES.includes(file.type);
    const maxSize = isPDF ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${isPDF ? "10MB" : "5MB"}.` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const folder = isPDF ? "documents" : "uploads";
    const filename = `${folder}/${timestamp}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      type: isPDF ? "pdf" : "image",
    });
  } catch (error) {
    console.error("Upload error:", error);
    
    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Check for common Vercel Blob errors
    if (errorMessage.includes("BLOB_READ_WRITE_TOKEN")) {
      return NextResponse.json(
        { error: "Server configuration error: Invalid blob storage token" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: `Failed to upload file: ${errorMessage}` },
      { status: 500 }
    );
  }
}
