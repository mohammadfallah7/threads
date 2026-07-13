import { createComment } from "@/app/(protected)/feed/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateComment = (afterSuccess?: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Comment create successfully");
        afterSuccess?.();
        router.refresh();
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
