"use server";

import { getSession } from "@/app/actions";
import prisma from "@/lib/prisma";

export async function getFollowSuggestions(term?: string) {
  try {
    const session = await getSession();

    return await prisma.user.findMany({
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
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}
