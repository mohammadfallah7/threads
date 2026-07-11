"use client";

import { useModal } from "@/hooks";

export const EditProfileButton = () => {
  const { openEditProfile } = useModal();

  return (
    <button
      onClick={openEditProfile}
      className="border border-border w-full py-1 rounded-lg cursor-pointer hover:bg-surface-hover transition-colors duration-300"
    >
      Edit Profile
    </button>
  );
};
