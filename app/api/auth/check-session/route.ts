import { getSession } from "@/app/actions";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await getSession();
    return NextResponse.json({ success: true, response }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
};
