"use client";

import { useModal, useSelectedComment, useSession } from "@/hooks";
import type { Comment } from "@/types";
import { LucideEllipsis, LucidePen, LucideTrash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { FC, useState } from "react";
import { Avatar } from "./avatar";

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  const { session } = useSession();
  const { setSelectedComment } = useSelectedComment();
  const { openDeleteComment, openUpdateComment } = useModal();
  const [showMenu, setShowMenu] = useState(false);

  const isUserComment = session?.user.id === comment.author.id;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar
            alt={`Avatar of ${comment.author.username}`}
            src={comment.author.image}
            size={32}
          />
          <Link
            href={isUserComment ? "/profile" : `/${comment.author.username}`}
            className="font-medium text-sm"
          >
            @{comment.author.username}
          </Link>
          <span className="text-muted text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isUserComment && (
          <div className="relative">
            <button
              onClick={() => {
                setShowMenu((prev) => !prev);
              }}
              className="text-muted cursor-pointer hover:text-primary transition-colors duration-300"
            >
              <LucideEllipsis className="size-4" />
            </button>
            {showMenu && (
              <div className="absolute top-6 right-0 flex gap-4 px-3 py-2 rounded-lg bg-surface-hover">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedComment(comment);
                    setShowMenu(false);
                    openDeleteComment();
                  }}
                >
                  <LucideTrash2 className="size-4" />
                </button>
                <div className="h-4 w-px bg-primary/80" />
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedComment(comment);
                    setShowMenu(false);
                    openUpdateComment();
                  }}
                >
                  <LucidePen className="size-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-sm">{comment.content}</p>
    </div>
  );
};
