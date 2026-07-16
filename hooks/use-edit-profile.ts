import { editProfile } from "@/app/(protected)/profile/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useModal } from "./use-modal";

export const useEditProfile = () => {
  const router = useRouter();
  const { closeEditProfile } = useModal();

  return useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      if (data.success) {
        router.refresh();
        closeEditProfile();
        toast.success(data.response);
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
