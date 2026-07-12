"use client";

import { useToggleLike } from "@/hooks";
import clsx from "clsx";
import { LucideHeart } from "lucide-react";
import { FC, useState } from "react";

interface LikeButtonProps {
  initialLikeCount: number;
  initialIsLiked: boolean;
  postId: string;
}

export const LikeButton: FC<LikeButtonProps> = ({
  initialLikeCount,
  initialIsLiked,
  postId,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const { mutate, isPending } = useToggleLike();

  function handleLike() {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
    mutate(postId);
  }

  return (
    <button
      disabled={isPending}
      onClick={handleLike}
      className={clsx(
        "cursor-pointer flex items-center gap-1.5 hover:bg-surface-hover transition-all duration-300 px-3 py-2 rounded-full disabled:opacity-60",
        { "text-error": isLiked, "text-muted": !isLiked },
      )}
    >
      <LucideHeart className={clsx("size-5", { "fill-error": isLiked })} />
      <span className="text-xs">{likeCount}</span>
    </button>
  );
};
