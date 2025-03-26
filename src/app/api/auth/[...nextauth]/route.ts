import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      company: string | null;
      referralSource: string | null;
      sellingProducts?: string;
      avgDealSize?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    company: string | null;
    referralSource: string | null;
    sellingProducts?: string;
    avgDealSize?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
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

        // If a specific role is requested (e.g., ADMIN login page)
        if (credentials.role && user.role !== credentials.role) {
          throw new Error(`You are not authorized as a ${credentials.role}`);
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
          role: user.role || "CUSTOMER",
          company: user.company,
          referralSource: user.referralSource,
          sellingProducts: user.sellingProducts,
          avgDealSize: user.avgDealSize,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Default sign in page
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.company = token.company;
        session.user.referralSource = token.referralSource;
        session.user.sellingProducts = token.sellingProducts;
        session.user.avgDealSize = token.avgDealSize;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {

      if (user) {

        const customUser = user as {
          id: string;
          role: string;
          company: string | null;
          referralSource: string | null;
          sellingProducts?: string;
          avgDealSize?: string;
        };

        token.id = customUser.id;
        token.role = customUser.role;
        token.company = customUser.company;
        token.referralSource = customUser.referralSource;

        if (customUser.sellingProducts) {
          token.sellingProducts = customUser.sellingProducts;
        }

        if (customUser.avgDealSize) {
          token.avgDealSize = customUser.avgDealSize;
        }
      }

      // Handle updates when session is updated
      if (trigger === "update" && session?.user) {
        // Update the token with any fields from the session
        token.role = session.user.role || token.role;
        token.company = session.user.company || token.company;
        token.referralSource = session.user.referralSource || token.referralSource;

        if (session.user.sellingProducts) {
          token.sellingProducts = session.user.sellingProducts;
        }

        if (session.user.avgDealSize) {
          token.avgDealSize = session.user.avgDealSize;
        }
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };