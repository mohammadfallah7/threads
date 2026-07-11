"use client";

import { createContext, ReactNode, useState } from "react";

type ModalContextType = {
  isEditProfileOpen: boolean;
  openEditProfile: () => void;
  closeEditProfile: () => void;
  isCreatePostOpen: boolean;
  openCreatePost: () => void;
  closeCreatePost: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  function openEditProfile() {
    setIsEditProfileOpen(true);
    setIsCreatePostOpen(false);
  }

  function openCreatePost() {
    setIsCreatePostOpen(true);
    setIsEditProfileOpen(false);
  }

  function closeEditProfile() {
    setIsEditProfileOpen(false);
  }

  function closeCreatePost() {
    setIsCreatePostOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        isEditProfileOpen,
        openEditProfile,
        closeEditProfile,
        closeCreatePost,
        isCreatePostOpen,
        openCreatePost,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
