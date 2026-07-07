"use client";

import { useSetupUsername } from "@/hooks";
import { SetupUsernameSchema } from "@/schemas";
import { SetupUsernamePayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface SetupUsernameFormProps {
  email: string;
}

export const SetupUsernameForm: FC<SetupUsernameFormProps> = ({ email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupUsernamePayload>({
    resolver: zodResolver(SetupUsernameSchema),
  });
  const { mutate, isPending } = useSetupUsername();

  function submit(payload: SetupUsernamePayload) {
    mutate(payload);
  }

  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <h1 className="text-2xl font-semibold">Setup Username</h1>
      <form className="w-full space-y-4" onSubmit={handleSubmit(submit)}>
        <p className="text-sm text-muted text-center">{email}</p>
        <div className="space-y-1.5">
          <input
            {...register("username")}
            type="text"
            className="auth-input"
            placeholder="Chose your username"
          />
          {errors.username && (
            <p className="text-error text-sm">{errors.username.message}</p>
          )}
        </div>
        <button disabled={isPending} type="submit" className="auth-btn">
          {isPending && <LucideLoader className="size-4 animate-spin" />}
          Continue
        </button>
      </form>
    </div>
  );
};
