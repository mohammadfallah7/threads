"use server";

import { getSession } from "@/app/actions";
import prisma from "@/lib/prisma";

export async function getPost(id: string) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    return await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        content: true,
        image: true,
        createdAt: true,
        author: {
          select: { id: true, name: true, image: true, username: true },
        },
        likes: { where: { userId: session.user.id }, select: { id: true } },
        _count: { select: { comments: true, likes: true } },
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}
