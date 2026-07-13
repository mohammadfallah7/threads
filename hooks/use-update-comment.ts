import { updateComment } from "@/app/(protected)/feed/[id]/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateComment = (afterSuccess?: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      if (data.success) {
        router.refresh();
        afterSuccess?.();
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
