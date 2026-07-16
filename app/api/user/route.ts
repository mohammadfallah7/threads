import { editProfile } from "@/app/(protected)/profile/actions";
import { getUser } from "@/app/actions";
import { EditProfileSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");

    const response = await getUser({
      username: username ?? undefined,
    });
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

export const PUT = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validatedFields = EditProfileSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: z.treeifyError(validatedFields.error).properties,
        },
        { status: 400 },
      );
    }

    const response = await editProfile(validatedFields.data);
    return NextResponse.json(
      { success: true, response },
      { status: response.status },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
};
