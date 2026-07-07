"use server";

import { auth } from "@/lib/auth";
import { RegisterPayload } from "@/types";

export async function register(payload: RegisterPayload) {
  try {
    const response = await auth.api.signUpEmail({ body: { ...payload } });

    return { success: true, response };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}
