"use client";

import { useLogin } from "@/hooks";
import { LoginSchema } from "@/schemas";
import { LoginPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
  });
  const { mutate, isPending } = useLogin();

  function submit(payload: LoginPayload) {
    mutate(payload);
  }

  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form className="w-full space-y-4" onSubmit={handleSubmit(submit)}>
        <div className="space-y-1.5">
          <input
            {...register("email")}
            type="email"
            className="auth-input"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <input
            {...register("password")}
            type="password"
            className="auth-input"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}
        </div>
        <button disabled={isPending} type="submit" className="auth-btn">
          {isPending && <LucideLoader className="size-4 animate-spin" />}
          Login
        </button>
      </form>
      <p className="text-sm text-muted">
        Do not have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};
