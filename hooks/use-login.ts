import { login } from "@/app/(authentication)/login/action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.success) {
        if (data.response?.user.username) {
          toast.success("Welcome back");
          router.replace("/feed");
        } else {
          toast.success("Welcome back", {
            description: "Please setup username for your account",
          });
          router.replace("/setup-username");
        }
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
