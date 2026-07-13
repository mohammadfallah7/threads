"use client";

import { useModal, useSession, useUpdateComment } from "@/hooks";
import type { Comment } from "@/types";
import { SubmitEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar } from "./avatar";
import { LucideLoader } from "lucide-react";

export const UpdateCommentForm = ({ comment }: { comment: Comment }) => {
  const { closeUpdateComment } = useModal();
  const { session } = useSession();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(comment.content);

  const { mutate, isPending } = useUpdateComment(() => {
    closeUpdateComment();
  });

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!comment || !content) return toast.error("Missing fields");

    mutate({ content, commentId: comment.id });
  }

  return (
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
              value={content || ""}
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
        disabled={isPending || !content}
        type="submit"
        className="btn btn-outline btn-sm self-end"
      >
        {isPending && <LucideLoader className="size-4 animate-spin" />}
        Update
      </button>
    </form>
  );
};
