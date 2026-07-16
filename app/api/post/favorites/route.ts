import { getLikedPosts } from "@/app/(protected)/favorites/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");

    const response = await getLikedPosts(cursor);
    return NextResponse.json({ success: true, response });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
};
