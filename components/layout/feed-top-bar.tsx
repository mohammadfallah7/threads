"use client";

import { useModal, useSession } from "@/hooks";
import Link from "next/link";
import { Avatar } from "../common";

export const FeedTopBar = () => {
  const { session } = useSession();
  const { openCreatePost } = useModal();

  return (
    <div className="flex justify-between items-center border-b border-border pb-2">
      <div className="flex items-center gap-3">
        <Link href="/profile">
          <Avatar
            alt={`Avatar of ${session?.user.name}`}
            src={session?.user.image}
            size={40}
          />
        </Link>
        <p
          onClick={openCreatePost}
          className="text-muted text-sm hover:text-primary transition-colors duration-300 cursor-pointer"
        >
          What&apos;s new?
        </p>
      </div>
      <button onClick={openCreatePost} className="btn btn-outline btn-sm">
        Post
      </button>
    </div>
  );
};
