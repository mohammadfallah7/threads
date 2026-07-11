import { editProfile } from "@/app/(protected)/profile/actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useModal } from "./use-modal";

export const useEditProfile = () => {
  const { closeEditProfile } = useModal();

  return useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.response);
        closeEditProfile();
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
