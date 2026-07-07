import z from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(50, "Full name cannot exceed 50 characters."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(16, "Password cannot exceed 16 characters.")
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase English letter.",
    )
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase English letter.",
    )
    .regex(/\d/, "Password must contain at least one number.")
    .regex(
      /^[A-Za-z\d@$!%*?&._-]+$/,
      "Password can only contain English letters, numbers, and common symbols (@$!%*?&._-).",
    ),
});

export const LoginSchema = RegisterSchema.omit({ name: true });
