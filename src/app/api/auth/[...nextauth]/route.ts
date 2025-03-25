import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      sellingProducts?: string;
      avgDealSize?: string;
    } & DefaultSession["user"];
  }

  interface User {
    sellingProducts?: string;
    avgDealSize?: string;
  }
}

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
callbacks: {
  async session({ session, token }) {
    if (session.user && token.sub) {
      session.user.id = token.sub;
      if (token.sellingProducts) {
        session.user.sellingProducts = token.sellingProducts as string;
      }
      if (token.avgDealSize) {
        session.user.avgDealSize = token.avgDealSize as string;
      }
    }
    return session;
  },
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      if (user.sellingProducts) {
        token.sellingProducts = user.sellingProducts;
      }
      if (user.avgDealSize) {
        token.avgDealSize = user.avgDealSize;
      }
    }
    return token;
  },
},
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };