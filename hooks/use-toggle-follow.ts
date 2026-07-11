import { toggleFollow } from "@/app/(protected)/[username]/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useToggleFollow = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: toggleFollow,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.response);
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
