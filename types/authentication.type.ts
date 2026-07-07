import { LoginSchema, RegisterSchema, SetupUsernameSchema } from "@/schemas";
import z from "zod";

export type RegisterPayload = z.infer<typeof RegisterSchema>;

export type LoginPayload = z.infer<typeof LoginSchema>;

export type SetupUsernamePayload = z.infer<typeof SetupUsernameSchema>;
