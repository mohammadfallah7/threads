import { SelectedPostContext } from "@/components";
import { useContext } from "react";

export const useSelectedPost = () => {
  const context = useContext(SelectedPostContext);
  if (!context)
    throw new Error(
      "Wrap your component inside SelectedPostProvider component",
    );

  return context;
};
