import { createComment } from "@/app/(protected)/feed/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateComment = (afterSuccess?: () => void) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      if (data.success) {
        router.refresh();
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        afterSuccess?.();
        toast.success("Comment create successfully");
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
