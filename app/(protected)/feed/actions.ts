"use server";

import { getSession } from "@/app/actions";
import prisma from "@/lib/prisma";
import { CreatePostPayload } from "@/types";
import { revalidatePath } from "next/cache";

export async function createPost(payload: CreatePostPayload) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const post = await prisma.post.create({
      data: { authorId: session.user.id, ...payload },
      select: { id: true, content: true, image: true, createdAt: true },
    });

    revalidatePath("/feed");
    return { success: true, response: post };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}
