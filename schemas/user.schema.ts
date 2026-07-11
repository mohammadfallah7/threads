import z from "zod";

export const EditProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(50, "Full name cannot exceed 50 characters."),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username cannot exceed 30 characters."),
  bio: z
    .string()
    .trim()
    .max(100, "Bio cannot exceed 100 characters.")
    .nullable(),
  image: z.string().nullable(),
});
