"use server";

import { auth } from "@/lib/auth";
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
