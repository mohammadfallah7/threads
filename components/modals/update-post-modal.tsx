"use client";

import { useModal, useSelectedPost } from "@/hooks";
import { UpdatePostForm } from "../common";
import { Modal } from "../ui";

export const UpdatePostModal = () => {
  const { isUpdatePostOpen, closeUpdatePost } = useModal();
  const { selectedPost } = useSelectedPost();

  if (!selectedPost) return;

  return (
    <Modal
      title="Update post"
      isOpen={isUpdatePostOpen}
      onClose={closeUpdatePost}
    >
      <UpdatePostForm key={selectedPost.id} post={selectedPost} />
    </Modal>
  );
};
