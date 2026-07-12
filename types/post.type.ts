import { CreatePostSchema } from "@/schemas";
import z from "zod";

export type CreatePostPayload = z.infer<typeof CreatePostSchema>;

export type Post = {
  id: string;
  content: string | null;
  image: string | null;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  };
  likes: { id: string }[];
  _count: { comments: number; likes: number };
};
