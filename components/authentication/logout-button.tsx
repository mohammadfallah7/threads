"use client";

import { useLogout } from "@/hooks";
import { LucideLoader, LucideLogOut } from "lucide-react";

export const LogoutButton = () => {
  const { mutate, isPending } = useLogout();

  return (
    <button disabled={isPending} onClick={() => mutate()} className="aside-btn">
      {isPending ? (
        <LucideLoader className="size-5 animate-spin" />
      ) : (
        <LucideLogOut className="size-6" />
      )}
    </button>
  );
};
