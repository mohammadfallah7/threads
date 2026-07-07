"use server";

import { auth } from "@/lib/auth";
import { LoginPayload } from "@/types";
import { headers } from "next/headers";

export async function login(payload: LoginPayload) {
  try {
    const response = await auth.api.signInEmail({
      body: { ...payload },
      headers: await headers(),
    });

    return { success: true, response };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}
