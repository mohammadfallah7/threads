"use client";

import { useEditProfile, useModal, useSession } from "@/hooks";
import { EditProfileSchema } from "@/schemas";
import { EditProfilePayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import { LucideLoader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar } from "../common";
import { Modal } from "../ui";

import "@uploadcare/react-uploader/core.css";

export const EditProfileModal = () => {
  const { isEditProfileOpen, closeEditProfile } = useModal();
  const { session } = useSession();

  const [previewImage, setPreviewImage] = useState(session?.user.image);

  const { register, handleSubmit, setValue } = useForm<EditProfilePayload>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      image: session?.user.image,
      name: session?.user.name,
      username: session?.user.username ? session.user.username : undefined,
      bio: session?.user.bio,
    },
  });

  const { mutate, isPending } = useEditProfile();

  function submit(payload: EditProfilePayload) {
    mutate(payload);
  }

  return (
    <Modal
      title="Edit Profile"
      isOpen={isEditProfileOpen}
      onClose={closeEditProfile}
    >
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar
            src={previewImage ?? session?.user.image}
            alt={`Avatar of ${session?.user.name}`}
            size={60}
          />
          <FileUploaderRegular
            pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_API_KEY!}
            cdnCname={process.env.NEXT_PUBLIC_UPLOADCARE_CDN_CNAME}
            sourceList="local, camera"
            cameraModes="photo"
            filesViewMode="list"
            multiple={false}
            onFileUploadSuccess={(file) => {
              setPreviewImage(file.uuid);
              setValue("image", file.uuid);
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Your name"
            className="input"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">Username</label>
          <input
            {...register("username")}
            type="text"
            placeholder="@username"
            className="input"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">Bio</label>
          <textarea
            {...register("bio")}
            placeholder="Write about yourself..."
            className="textarea"
            rows={3}
          />
        </div>

        <button disabled={isPending} className="btn btn-primary self-end">
          {isPending && <LucideLoader className="size-4 animate-spin" />}
          Save Changes
        </button>
      </form>
    </Modal>
  );
};
