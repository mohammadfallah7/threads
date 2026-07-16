import {
  CreateCommentSchema,
  CreatePostSchema,
  UpdatePostSchema,
} from "@/schemas";
import z from "zod";

export type CreatePostPayload = z.infer<typeof CreatePostSchema>;

export type UpdatePostPayload = z.infer<typeof UpdatePostSchema>;

export type CreateCommentPayload = z.infer<typeof CreateCommentSchema>;

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
  likes: { userId: string }[];
  _count: { comments: number; likes: number };
};

export type Comment = {
  id: string;
  content: string | null;
  createdAt: Date;
  author: {
    id: string;
    username: string | null;
    image: string | null;
  };
};
