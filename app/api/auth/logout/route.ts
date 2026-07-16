import { logout } from "@/app/actions";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = await logout();
    return NextResponse.json(response, { status: response.status });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
};
