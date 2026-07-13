"use client";

import { useModal, useSession, useUpdatePost } from "@/hooks";
import { createImageURL } from "@/lib/utils";
import type { Post } from "@/types";
import { LucideLoader } from "lucide-react";
import Image from "next/image";
import { SubmitEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar } from "./avatar";

export const UpdatePostForm = ({ post }: { post: Post }) => {
  const { closeUpdatePost } = useModal();
  const { session } = useSession();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(post.content);

  const { mutate, isPending } = useUpdatePost(() => {
    closeUpdatePost();
  });

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    textArea.style.height = "auto";
    const next = Math.min(textArea.scrollHeight, 200);
    textArea.style.height = `${next}px`;
    textArea.style.overflowY = textArea.scrollHeight > 200 ? "auto" : "hidden";
  }, [content]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!post) return toast.error("Missing fields");

    mutate({ content, postId: post.id });
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
                setContent(e.target.value);
              }}
              placeholder="Write something"
              className="w-full outline-none resize-none text-sm"
              rows={1}
            />
          </div>
          {post.image && (
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                alt="Test"
                src={createImageURL(post.image)}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="btn btn-outline btn-sm self-end"
      >
        {isPending && <LucideLoader className="size-4 animate-spin" />}
        Update
      </button>
    </form>
  );
};
