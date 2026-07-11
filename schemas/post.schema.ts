import z from "zod";

export const CreatePostSchema = z
  .object({
    content: z
      .string()
      .trim()
      .max(200, "Content cannot exceed 200 characters.")
      .optional(),
    image: z.string().optional(),
  })
  .refine((data) => (data.content?.length ?? 0) > 0 || !!data.image, {
    error: "Either content or image is required.",
    path: ["content"],
  });
