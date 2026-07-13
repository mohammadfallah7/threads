"use client";

import {
  useCreateComment,
  useModal,
  useSelectedPost,
  useSession,
} from "@/hooks";
import { LucideLoader } from "lucide-react";
import { SubmitEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, PostCard } from "../common";
import { Modal } from "../ui";

export const CreateReplyModal = () => {
  const { isCreateReplyOpen, closeCreateReply } = useModal();
  const { selectedPost } = useSelectedPost();
  const { session } = useSession();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState<string | undefined>(undefined);
  const { mutate, isPending } = useCreateComment(() => {
    setContent("");
    closeCreateReply();
  });

  if (!selectedPost) return;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPost || !content) return toast.error("Missing fields");

    mutate({ content, postId: selectedPost.id });
  }

  return (
    <Modal
      title="Create Reply"
      isOpen={isCreateReplyOpen}
      onClose={closeCreateReply}
    >
      <PostCard post={selectedPost} />
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Avatar
            alt={`Avatar of ${session?.user.name}`}
            src={session?.user.image}
            size={40}
          />
          <div className="flex-1 space-y-3">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{session?.user.name}</p>
              <textarea
                ref={textAreaRef}
                value={content}
                onChange={(e) => {
                  if (!textAreaRef.current) return;
                  const textArea = textAreaRef.current;

                  textArea.style.height = "auto";
                  if (textArea.scrollHeight > 200) {
                    textArea.style.height = "200px";
                    textArea.style.overflowY = "auto";
                  } else {
                    textArea.style.height = textArea.scrollHeight + "px";
                    textArea.style.overflowY = "hidden";
                  }

                  setContent(e.target.value);
                }}
                placeholder="Write something"
                className="w-full outline-none resize-none text-sm"
                rows={1}
              />
            </div>
          </div>
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="btn btn-outline btn-sm self-end"
        >
          {isPending && <LucideLoader className="size-4 animate-spin" />}
          Reply
        </button>
      </form>
    </Modal>
  );
};
