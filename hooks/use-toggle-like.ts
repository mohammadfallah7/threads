import { toggleLike } from "@/app/(protected)/feed/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useToggleLike = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: toggleLike,
    onSuccess: (data) => {
      if (data.success) {
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
