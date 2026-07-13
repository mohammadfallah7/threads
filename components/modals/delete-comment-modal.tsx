"use client";

import { useModal, useSelectedComment, useDeleteComment } from "@/hooks";
import { LucideLoader } from "lucide-react";
import { Modal } from "../ui";

export const DeleteCommentModal = () => {
  const { isDeleteCommentOpen, closeDeleteComment } = useModal();
  const { selectedComment } = useSelectedComment();
  const { mutate, isPending } = useDeleteComment();

  if (!selectedComment) return;

  return (
    <Modal
      title="Delete Comment"
      isOpen={isDeleteCommentOpen}
      onClose={closeDeleteComment}
    >
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium">Delete this comment?</h4>
          <p className="mt-1 text-sm text-primary/80">
            This action cannot be undone. Once you delete this comment, it will
            be be permanently removed and cannot be recovered.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={closeDeleteComment} className="btn btn-outline">
            Cancel
          </button>
          <button
            disabled={isPending}
            onClick={() => mutate(selectedComment.id)}
            className="btn btn-primary"
          >
            {isPending && <LucideLoader className="size-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};
