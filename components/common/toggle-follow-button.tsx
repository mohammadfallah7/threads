"use client";

import { useToggleFollow } from "@/hooks";
import clsx from "clsx";
import { LucideLoader } from "lucide-react";
import { FC } from "react";

interface ToggleFollowButtonProps {
  isAlreadyFollowed: boolean;
  targetUserId: string;
}

export const ToggleFollowButton: FC<ToggleFollowButtonProps> = ({
  isAlreadyFollowed,
  targetUserId,
}) => {
  const { mutate, isPending } = useToggleFollow();

  return (
    <button
      disabled={isPending}
      onClick={() => mutate(targetUserId)}
      className={clsx(
        "w-full py-1 rounded-lg cursor-pointer transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2",
        {
          "bg-primary text-background hover:bg-primary/80": !isAlreadyFollowed,
          "hover:bg-surface-hover border border-border": isAlreadyFollowed,
        },
      )}
    >
      {isPending && <LucideLoader className="size-4 animate-spin" />}
      {isAlreadyFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};
