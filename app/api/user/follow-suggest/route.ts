import { getFollowSuggestions } from "@/app/(protected)/search/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const term = searchParams.get("term");
    const cursor = searchParams.get("cursor");

    const response = await getFollowSuggestions(term, cursor);
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
