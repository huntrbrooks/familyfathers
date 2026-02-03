import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getContent, setContent, getAllContent } from "@/lib/content";
import { ContentKey, CONTENT_KEYS } from "@/lib/redis";

// GET - Fetch content (single section or all)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section") as ContentKey | null;

    // If requesting a specific section
    if (section && section in CONTENT_KEYS) {
      const content = await getContent(section);
      return NextResponse.json({ [section]: content });
    }

    // Return all content
    const allContent = await getAllContent();
    return NextResponse.json(allContent);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

// POST - Update content (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { section, content } = body;

    if (!section || !content) {
      return NextResponse.json(
        { error: "Section and content are required" },
        { status: 400 }
      );
    }

    if (!(section in CONTENT_KEYS)) {
      return NextResponse.json(
        { error: "Invalid section" },
        { status: 400 }
      );
    }

    const success = await setContent(section as ContentKey, content);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to save content" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
