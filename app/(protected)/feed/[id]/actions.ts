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

export async function getComments(id: string) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    return await prisma.comment.findMany({
      where: { postId: id },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: { id: true, image: true, username: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}

export async function deleteComment(commentId: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true },
    });
    if (!comment) return { success: false, error: "Comment not found" };

    await prisma.comment.delete({ where: { id: comment.id } });
    return { success: true, response: "Comment deleted successfully" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}

export async function updateComment(payload: {
  commentId: string;
  content: string;
}) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const comment = await prisma.comment.findUnique({
      where: { id: payload.commentId },
      select: { id: true },
    });
    if (!comment) return { success: false, error: "Comment not found" };

    await prisma.comment.update({
      where: { id: comment.id },
      data: { content: payload.content },
    });
    return { success: true, response: "Comment updated successfully" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}
