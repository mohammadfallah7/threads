import { SelectedCommentContext } from "@/components";
import { useContext } from "react";

export const useSelectedComment = () => {
  const context = useContext(SelectedCommentContext);
  if (!context)
    throw new Error(
      "Wrap your component inside SelectedCommentProvider component",
    );

  return context;
};
