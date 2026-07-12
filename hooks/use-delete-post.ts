import { deletePost } from "@/app/(protected)/feed/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useModal } from "./use-modal";

export const useDeletePost = () => {
  const router = useRouter();
  const { closeDeletePost } = useModal();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      if (data.success) {
        router.refresh();
        closeDeletePost();
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
