import { RegisterSchema } from "@/schemas";
import z from "zod";

export type RegisterPayload = z.infer<typeof RegisterSchema>;
