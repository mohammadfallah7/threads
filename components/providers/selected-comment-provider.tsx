"use client";

import type { Comment } from "@/types";
import { createContext, FC, ReactNode, useState } from "react";

type SelectedCommentContextType = {
  selectedComment?: Comment;
  setSelectedComment: (comment: Comment) => void;
};

export const SelectedCommentContext = createContext<SelectedCommentContextType>(
  {} as SelectedCommentContextType,
);

interface SelectedCommentProviderProps {
  children: ReactNode;
}

export const SelectedCommentProvider: FC<SelectedCommentProviderProps> = ({
  children,
}) => {
  const [comment, setComment] = useState<Comment | undefined>(undefined);

  function setSelectedComment(comment: Comment) {
    setComment(comment);
  }

  return (
    <SelectedCommentContext.Provider
      value={{ setSelectedComment, selectedComment: comment }}
    >
      {children}
    </SelectedCommentContext.Provider>
  );
};
