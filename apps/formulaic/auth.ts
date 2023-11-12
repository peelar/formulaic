import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
