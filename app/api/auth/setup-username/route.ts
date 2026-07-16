import { setupUsername } from "@/app/(authentication)/setup-username/actions";
import { SetupUsernameSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const PATCH = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validatedFields = SetupUsernameSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: z.treeifyError(validatedFields.error).properties,
        },
        { status: 400 },
      );
    }

    const response = await setupUsername(validatedFields.data);
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
