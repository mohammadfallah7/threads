"use client";

import { createContext, ReactNode, useState } from "react";

type ModalContextType = {
  isEditProfileOpen: boolean;
  openEditProfile: () => void;
  closeEditProfile: () => void;
  isCreatePostOpen: boolean;
  openCreatePost: () => void;
  closeCreatePost: () => void;
  isDeletePostOpen: boolean;
  openDeletePost: () => void;
  closeDeletePost: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false);

  function openEditProfile() {
    setIsEditProfileOpen(true);
    setIsCreatePostOpen(false);
    setIsDeletePostOpen(false);
  }

  function openCreatePost() {
    setIsCreatePostOpen(true);
    setIsEditProfileOpen(false);
    setIsDeletePostOpen(false);
  }

  function openDeletePost() {
    setIsDeletePostOpen(true);
    setIsCreatePostOpen(false);
    setIsEditProfileOpen(false);
  }

  function closeEditProfile() {
    setIsEditProfileOpen(false);
  }

  function closeCreatePost() {
    setIsCreatePostOpen(false);
  }

  function closeDeletePost() {
    setIsDeletePostOpen(false);
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
        closeDeletePost,
        isDeletePostOpen,
        openDeletePost,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
