import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

// Generate a random secret for development if not set
const getSecret = () => {
  if (process.env.BETTER_AUTH_SECRET) {
    return process.env.BETTER_AUTH_SECRET;
  }
  // For build/development without .env, use a placeholder
  // This will show a warning but won't crash the build
  if (
    process.env.NODE_ENV === "production" &&
    !process.env.BETTER_AUTH_SECRET
  ) {
    console.warn("BETTER_AUTH_SECRET not set in production!");
  }
  return "development-secret-change-me-in-production";
};

export const auth = betterAuth({
  secret: getSecret(),
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      scope: ["read:user", "user:email", "repo"],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day - refresh session every day
  },
});

export type Session = typeof auth.$Infer.Session;
