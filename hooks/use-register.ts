import { register } from "@/app/(authentication)/register/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Welcome to Threads", {
          description: "Please setup username for your account",
        });
        router.push("/setup-username");
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
