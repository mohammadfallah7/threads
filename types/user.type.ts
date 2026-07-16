import { EditProfileSchema, GetUserSchema } from "@/schemas";
import z from "zod";

export type User = {
  id: string;
  name: string;
  email: string;
  username: string | null;
  image: string | null;
  bio: string | null;
  _count: { followers: number; following: number; posts: number };
};

export type EditProfilePayload = z.infer<typeof EditProfileSchema>;

export type GetUserPayload = z.infer<typeof GetUserSchema>;
