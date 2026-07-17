import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:5173"],
  emailAndPassword: {
    enabled: true,
  },
  user: { additionalFields: { bio: { type: "string", required: false } } },
  plugins: [username(), nextCookies()],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      partitioned: true,
    },
  },
});
