"use client";

import type { Comment } from "@/types";
import { FC } from "react";
import { Avatar } from "./avatar";
import moment from "moment";
import Link from "next/link";
import { useSession } from "@/hooks";

interface CommentsListProps {
  comments: Comment[];
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  const { session } = useSession();

  return (
    <div className="mt-3 space-y-4">
      {comments.map((comment) => {
        const isUserComment = session?.user.id === comment.author.id;

        return (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar
                alt={`Avatar of ${comment.author.username}`}
                src={comment.author.image}
                size={32}
              />
              <Link
                href={
                  isUserComment ? "/profile" : `/${comment.author.username}`
                }
                className="font-medium text-sm"
              >
                @{comment.author.username}
              </Link>
              <span className="text-muted text-xs">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        );
      })}
    </div>
  );
};
