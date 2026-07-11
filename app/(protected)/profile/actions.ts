"use server";

import { auth } from "@/lib/auth";
import { EditProfilePayload } from "@/types";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function editProfile(payload: EditProfilePayload) {
  try {
    await auth.api.updateUser({
      body: { ...payload },
      headers: await headers(),
    });

    revalidatePath("/profile");
    return { success: true, response: "Profile update successfully" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    return { success: false, error: errorMessage };
  }
}
