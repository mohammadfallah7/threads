"use server";

import { getSession } from "@/app/actions";
import prisma from "@/lib/prisma";

export async function toggleFollow(targetUserId: string) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized", status: 401 };

    if (targetUserId === session.user.id)
      return { success: false, error: "You cant follow yourself", status: 400 };

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: targetUserId,
        },
      },
      select: { id: true },
    });

    if (existingFollow) {
      await prisma.follow.delete({ where: { id: existingFollow.id } });
      return {
        success: true,
        response: "User unfollowed successfully",
        status: 200,
      };
    } else {
      await prisma.follow.create({
        data: { followerId: session.user.id, followingId: targetUserId },
      });
      return {
        success: true,
        response: "User followed successfully",
        status: 200,
      };
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage, status: 500 };
  }
}
