import { deletePost } from "@/app/(protected)/feed/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useModal } from "./use-modal";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const { closeDeletePost } = useModal();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["liked-posts"] });
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
