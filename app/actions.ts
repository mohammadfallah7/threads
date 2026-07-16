"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { GetUserPayload } from "@/types";
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

export async function getUser(payload: GetUserPayload) {
  try {
    const session = await getSession();

    return prisma.user.findUnique({
      where: {
        id: payload.username ? undefined : session?.user.id,
        username: payload.username,
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
    const session = await getSession();
    if (!session)
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };

    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      response: "May meet again",
      status: 200,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage, status: 500 };
  }
}
