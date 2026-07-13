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
  isDeleteCommentOpen: boolean;
  openDeleteComment: () => void;
  closeDeleteComment: () => void;
  isUpdateCommentOpen: boolean;
  openUpdateComment: () => void;
  closeUpdateComment: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateReplyOpen, setIsCreateReplyOpen] = useState(false);
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false);
  const [isDeleteCommentOpen, setIsDeleteCommentOpen] = useState(false);
  const [isUpdateCommentOpen, setIsUpdateCommentOpen] = useState(false);

  function openEditProfile() {
    setIsEditProfileOpen(true);
    setIsDeleteCommentOpen(false);
    setIsUpdateCommentOpen(false);
    setIsCreatePostOpen(false);
    setIsDeletePostOpen(false);
    setIsCreateReplyOpen(false);
  }

  function openCreatePost() {
    setIsCreatePostOpen(true);
    setIsDeleteCommentOpen(false);
    setIsUpdateCommentOpen(false);
    setIsEditProfileOpen(false);
    setIsDeletePostOpen(false);
    setIsCreateReplyOpen(false);
  }

  function openDeletePost() {
    setIsDeletePostOpen(true);
    setIsDeleteCommentOpen(false);
    setIsUpdateCommentOpen(false);
    setIsCreatePostOpen(false);
    setIsEditProfileOpen(false);
    setIsCreateReplyOpen(false);
  }

  function openDeleteComment() {
    setIsDeleteCommentOpen(true);
    setIsUpdateCommentOpen(false);
    setIsDeletePostOpen(false);
    setIsCreatePostOpen(false);
    setIsEditProfileOpen(false);
    setIsCreateReplyOpen(false);
  }

  function openUpdateComment() {
    setIsUpdateCommentOpen(true);
    setIsDeleteCommentOpen(false);
    setIsDeletePostOpen(false);
    setIsCreatePostOpen(false);
    setIsEditProfileOpen(false);
    setIsCreateReplyOpen(false);
  }

  function openCreateReply() {
    setIsCreateReplyOpen(true);
    setIsUpdateCommentOpen(false);
    setIsDeleteCommentOpen(false);
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

  function closeDeleteComment() {
    setIsDeleteCommentOpen(false);
  }

  function closeUpdateComment() {
    setIsUpdateCommentOpen(false);
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
        closeDeleteComment,
        closeUpdateComment,
        isDeleteCommentOpen,
        isUpdateCommentOpen,
        openDeleteComment,
        openUpdateComment,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
