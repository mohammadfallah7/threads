"use server";

import { getSession } from "@/app/actions";
import { auth } from "@/lib/auth";
import { EditProfilePayload } from "@/types";
import { headers } from "next/headers";

export async function editProfile(payload: EditProfilePayload) {
  try {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized", status: 401 };

    await auth.api.updateUser({
      body: { ...payload },
      headers: await headers(),
    });
    return {
      success: true,
      response: "Profile update successfully",
      status: 200,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage, status: 500 };
  }
}
