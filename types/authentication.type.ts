import { LoginSchema, RegisterSchema } from "@/schemas";
import z from "zod";

export type RegisterPayload = z.infer<typeof RegisterSchema>;

export type LoginPayload = z.infer<typeof LoginSchema>;
