import { ModalContext } from "@/components";
import { useContext } from "react";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Wrap your component inside ModalProvider component");
  }

  return context;
};
