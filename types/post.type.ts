import { CreatePostSchema } from "@/schemas";
import z from "zod";

export type CreatePostPayload = z.infer<typeof CreatePostSchema>;
