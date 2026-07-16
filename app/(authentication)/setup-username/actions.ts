"use server";

import { auth } from "@/lib/auth";
import { SetupUsernamePayload } from "@/types";
import { headers } from "next/headers";

export async function setupUsername(payload: SetupUsernamePayload) {
  try {
    await auth.api.updateUser({
      body: { ...payload },
      headers: await headers(),
    });
    return {
      success: true,
      response: "Your username has been set. You can now continue.",
      status: 200,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return { success: false, error: errorMessage, status: 500 };
  }
}
