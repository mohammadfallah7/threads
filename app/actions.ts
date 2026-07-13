"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}

export async function getUser(ref: {
  isYourProfile?: boolean;
  id?: string;
  username?: string;
}) {
  try {
    const session = await getSession();

    return prisma.user.findUnique({
      where: {
        id: ref.isYourProfile ? session?.user.id : ref.id,
        username: ref.username,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        bio: true,
        followers: {
          where: { followerId: session?.user.id },
          select: { followerId: true },
        },
        _count: { select: { followers: true, following: true, posts: true } },
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}

export async function logout() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      response: "May meet again",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}
