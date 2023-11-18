import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Session, type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async session({ session, user }) {
      if (user.id) {
        session.user.id = user.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

export type SessionUser = Required<Session["user"]>;

export async function getUser(): Promise<SessionUser> {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    console.warn("No user found");
    redirect("/");
  }

  if (
    user.email === undefined ||
    user.id === undefined ||
    user.name === undefined ||
    user.image === undefined
  ) {
    throw new Error("User data is not complete");
  }

  return user as Promise<SessionUser>;
}
