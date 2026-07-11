import { createPost } from "@/app/(protected)/feed/actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useModal } from "./use-modal";

export const useCreatePost = (afterSuccess?: () => void) => {
  const { closeCreatePost } = useModal();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Post create successfully");
        closeCreatePost();
        afterSuccess?.();
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
