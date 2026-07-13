import type { Comment } from "@/types";
import { FC } from "react";
import { CommentCard } from "./comment-card";

interface CommentsListProps {
  comments: Comment[];
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="mt-3 space-y-4">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
