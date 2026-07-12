"use client";

import { useDeletePost, useModal, useSelectedPost } from "@/hooks";
import { LucideLoader } from "lucide-react";
import { Modal } from "../ui";

export const DeletePostModal = () => {
  const { isDeletePostOpen, closeDeletePost } = useModal();
  const { selectedPost } = useSelectedPost();
  const { mutate, isPending } = useDeletePost();

  if (!selectedPost) return;

  return (
    <Modal
      title="Delete Post"
      isOpen={isDeletePostOpen}
      onClose={closeDeletePost}
    >
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium">Delete this post?</h4>
          <p className="mt-1 text-sm text-primary/80">
            This action cannot be undone. Once you delete this post, it will be
            be permanently removed and cannot be recovered.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={closeDeletePost} className="btn btn-outline">
            Cancel
          </button>
          <button
            disabled={isPending}
            onClick={() => mutate(selectedPost.id)}
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
