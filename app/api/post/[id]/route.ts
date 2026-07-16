import { getPost } from "@/app/(protected)/feed/[id]/actions";
import {
  deletePost,
  toggleLike,
  updatePost,
} from "@/app/(protected)/feed/actions";
import { UpdatePostSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    const response = await getPost(id);
    if (!response)
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );

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

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    const response = await toggleLike(id);
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

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    const response = await deletePost(id);
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

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedFields = UpdatePostSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: z.treeifyError(validatedFields.error).properties,
        },
        { status: 400 },
      );
    }

    const response = await updatePost({
      postId: id,
      content: validatedFields.data.content,
    });
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
