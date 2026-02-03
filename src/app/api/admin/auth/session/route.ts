import { NextResponse } from "next/server";
import { getSessionStatus } from "@/lib/auth";

export async function GET() {
  try {
    const status = await getSessionStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}
