import { deleteComment } from "@/app/(protected)/feed/[id]/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useModal } from "./use-modal";

export const useDeleteComment = () => {
  const router = useRouter();
  const { closeDeleteComment } = useModal();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      if (data.success) {
        router.refresh();
        closeDeleteComment();
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
