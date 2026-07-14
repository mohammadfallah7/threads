"use server";

import { getSession } from "@/app/actions";
import prisma from "@/lib/prisma";

export async function getFollowSuggestions(
  term?: string,
  cursor?: string | null,
  pageSize: number = 8,
) {
  try {
    const session = await getSession();

    const users = await prisma.user.findMany({
      where: {
        NOT: { id: session?.user.id },
        followers: {
          none: {
            followerId: session?.user.id,
          },
        },
        ...(term && {
          OR: [
            {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },
            {
              username: {
                contains: term,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        bio: true,
        _count: { select: { followers: true, following: true, posts: true } },
      },
      take: pageSize + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: "desc" },
    });

    const hasMore = users.length > pageSize;
    if (hasMore) users.pop();

    return { users, nextCursor: hasMore ? users[users.length - 1].id : null };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}
