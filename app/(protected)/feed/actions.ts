"use server";

import { getSession } from "@/app/actions";
import prisma from "@/lib/prisma";
import { CreateCommentPayload, CreatePostPayload } from "@/types";

export async function createPost(payload: CreatePostPayload) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const post = await prisma.post.create({
      data: { authorId: session.user.id, ...payload },
      select: { id: true, content: true, image: true, createdAt: true },
    });

    return { success: true, response: post };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}

export async function createComment(payload: CreateCommentPayload) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const comment = await prisma.comment.create({
      data: { authorId: session.user.id, ...payload },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: { select: { id: true, name: true, username: true } },
      },
    });

    return { success: true, response: comment };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}

export async function toggleLike(postId: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId: session.user.id, postId } },
      select: { id: true },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return { success: true, response: "Post disliked successfully" };
    } else {
      await prisma.like.create({ data: { postId, userId: session.user.id } });
      return { success: true, response: "Post liked successfully" };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}

export async function deletePost(postId: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true },
    });
    if (!post) return { success: false, error: "Post not found" };

    await prisma.post.delete({ where: { id: post.id } });
    return { success: true, response: "Post deleted successfully" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}

export async function updatePost(payload: {
  postId: string;
  content?: string | null;
}) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const post = await prisma.post.findUnique({
      where: { id: payload.postId },
      select: { id: true, authorId: true },
    });
    if (!post) return { success: false, error: "Post not found" };
    if (post.authorId !== session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.post.update({
      where: { id: post.id },
      data: { content: payload.content },
    });
    return { success: true, response: "Post updated successfully" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}

export async function getPosts(cursor?: string | null, pageSize: number = 3) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const posts = await prisma.post.findMany({
      take: pageSize + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
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
      orderBy: { createdAt: "desc" },
    });

    const hasMore = posts.length > pageSize;
    if (hasMore) posts.pop();

    return { posts, nextCursor: hasMore ? posts[posts.length - 1].id : null };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}
