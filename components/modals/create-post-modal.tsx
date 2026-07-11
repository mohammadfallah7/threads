"use client";

import { useCreatePost, useModal, useSession } from "@/hooks";
import {
  LucideCheck,
  LucideImage,
  LucideInfo,
  LucideLoader,
  LucideX,
} from "lucide-react";
import Image from "next/image";
import { SubmitEvent, useRef, useState } from "react";
import { Avatar } from "../common";
import { Modal } from "../ui";

export const CreatePostModal = () => {
  const { isCreatePostOpen, closeCreatePost } = useModal();
  const { session } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [uploadImageStatus, setUploadImageStatus] = useState<
    "pending" | "success" | "error"
  >();

  const [content, setContent] = useState<string | undefined>();
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [image, setImage] = useState<File | undefined>();

  const { mutate, isPending } = useCreatePost(() => {
    setContent(undefined);
    setPreviewImage(undefined);
    setImage(undefined);
  });

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    let imageUuid: string | undefined;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      setUploadImageStatus("pending");

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data: { file: string } = await res.json();

        imageUuid = data.file;
        setUploadImageStatus("success");
      } catch (error) {
        setUploadImageStatus("error");

        throw new Error(
          error instanceof Error
            ? error.message
            : "Uploadcare didn't return a file id",
        );
      }
    }

    mutate({ image: imageUuid, content });
  }

  return (
    <Modal
      title="Create Post"
      isOpen={isCreatePostOpen}
      onClose={closeCreatePost}
    >
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
            {previewImage && (
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                {uploadImageStatus && (
                  <div className="absolute inset-0 z-10 bg-background/80 flex flex-col gap-1.5 items-center justify-center">
                    {uploadImageStatus === "pending" && (
                      <>
                        <LucideLoader className="size-4 animate-spin" />
                        <p className="text-xs">Uploading...</p>
                      </>
                    )}
                    {uploadImageStatus === "success" && (
                      <>
                        <LucideCheck className="size-4" />
                        <p className="text-xs">Uploaded</p>
                      </>
                    )}
                    {uploadImageStatus === "error" && (
                      <>
                        <LucideInfo className="size-4" />
                        <p className="text-xs">Error</p>
                      </>
                    )}
                  </div>
                )}
                {!uploadImageStatus && (
                  <button
                    type="button"
                    onClick={() => setPreviewImage(undefined)}
                    className="z-20 cursor-pointer absolute top-3 right-3 bg-background/70 p-1.5 rounded-full hover:bg-background/90 transition-colors duration-300"
                  >
                    <LucideX className="size-4" />
                  </button>
                )}
                <Image
                  alt="Test"
                  src={previewImage}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <input
            ref={fileInputRef}
            accept="image/*"
            multiple={false}
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const url = URL.createObjectURL(file);

              setImage(file);
              setPreviewImage(url);
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg bg-background/60 cursor-pointer hover:bg-surface-hover transition duration-300"
          >
            <LucideImage className="size-4" />
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending || (!content && !image)}
          className="btn btn-outline btn-sm self-end"
        >
          {isPending && <LucideLoader className="size-4 animate-spin" />}
          Post
        </button>
      </form>
    </Modal>
  );
};
