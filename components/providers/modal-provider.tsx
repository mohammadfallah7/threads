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
  isCreateReplyOpen: boolean;
  openCreateReply: () => void;
  closeCreateReply: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false);
  const [isCreateReplyOpen, setIsCreateReplyOpen] = useState(false);

  function openEditProfile() {
    setIsEditProfileOpen(true);
    setIsCreatePostOpen(false);
    setIsDeletePostOpen(false);
    setIsCreateReplyOpen(false);
  }

  function openCreatePost() {
    setIsCreatePostOpen(true);
    setIsEditProfileOpen(false);
    setIsDeletePostOpen(false);
    setIsCreateReplyOpen(false);
  }

  function openDeletePost() {
    setIsDeletePostOpen(true);
    setIsCreatePostOpen(false);
    setIsEditProfileOpen(false);
    setIsCreateReplyOpen(false);
  }

  function openCreateReply() {
    setIsCreateReplyOpen(true);
    setIsDeletePostOpen(false);
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

  function closeCreateReply() {
    setIsCreateReplyOpen(false);
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
        closeCreateReply,
        isCreateReplyOpen,
        openCreateReply,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
