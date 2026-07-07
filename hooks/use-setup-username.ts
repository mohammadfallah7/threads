import { setupUsername } from "@/app/(authentication)/setup-username/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSetupUsername = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: setupUsername,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.response);
        router.push("/feed");
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
