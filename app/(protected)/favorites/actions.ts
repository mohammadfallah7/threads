"use server";

import { getSession } from "@/app/actions";
import prisma from "@/lib/prisma";

export async function getLikedPosts(
  cursor?: string | null,
  pageSize: number = 3,
) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const posts = await prisma.post.findMany({
      take: pageSize + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      where: { likes: { some: { userId: session.user.id } } },
      select: {
        id: true,
        content: true,
        image: true,
        createdAt: true,
        author: {
          select: { id: true, name: true, image: true, username: true },
        },
        likes: { where: { userId: session.user.id }, select: { userId: true } },
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
