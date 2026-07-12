"use client";

import type { Post } from "@/types";
import { createContext, FC, ReactNode, useState } from "react";

type SelectedPostContextType = {
  selectedPost?: Post;
  setSelectedPost: (post: Post) => void;
};

export const SelectedPostContext = createContext<SelectedPostContextType>(
  {} as SelectedPostContextType,
);

interface SelectedPostProviderProps {
  children: ReactNode;
}

export const SelectedPostProvider: FC<SelectedPostProviderProps> = ({
  children,
}) => {
  const [post, setPost] = useState<Post | undefined>(undefined);

  function setSelectedPost(post: Post) {
    setPost(post);
  }

  return (
    <SelectedPostContext.Provider
      value={{ selectedPost: post, setSelectedPost }}
    >
      {children}
    </SelectedPostContext.Provider>
  );
};
