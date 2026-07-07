"use client";

import { useRegister } from "@/hooks";
import { RegisterSchema } from "@/schemas";
import { RegisterPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({ resolver: zodResolver(RegisterSchema) });
  const { mutate, isPending } = useRegister();

  function submit(payload: RegisterPayload) {
    mutate(payload);
  }

  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form className="w-full space-y-4" onSubmit={handleSubmit(submit)}>
        <div className="space-y-1.5">
          <input
            {...register("name")}
            type="text"
            className="auth-input"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}
        </div>

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
          Register
        </button>
      </form>
      <p className="text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};
