"use client";

import { createContext, ReactNode, useState } from "react";

type ModalContextType = {
  isEditProfileOpen: boolean;
  openEditProfile: () => void;
  closeEditProfile: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  function openEditProfile() {
    setIsEditProfileOpen(true);
  }

  function closeEditProfile() {
    setIsEditProfileOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{ isEditProfileOpen, openEditProfile, closeEditProfile }}
    >
      {children}
    </ModalContext.Provider>
  );
};
