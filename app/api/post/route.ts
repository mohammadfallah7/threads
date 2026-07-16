import { createPost, getPosts } from "@/app/(protected)/feed/actions";
import { CreatePostSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");

    const response = await getPosts(cursor);
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

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validatedFields = CreatePostSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: z.treeifyError(validatedFields.error).properties,
        },
        { status: 400 },
      );
    }

    const response = await createPost(validatedFields.data);
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
