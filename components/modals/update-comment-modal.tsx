"use client";

import { useModal, useSelectedComment } from "@/hooks";
import { UpdateCommentForm } from "../common";
import { Modal } from "../ui";

export const UpdateCommentModal = () => {
  const { isUpdateCommentOpen, closeUpdateComment } = useModal();
  const { selectedComment } = useSelectedComment();

  if (!selectedComment) return;

  return (
    <Modal
      title="Update comment"
      isOpen={isUpdateCommentOpen}
      onClose={closeUpdateComment}
    >
      <UpdateCommentForm key={selectedComment.id} comment={selectedComment} />
    </Modal>
  );
};
