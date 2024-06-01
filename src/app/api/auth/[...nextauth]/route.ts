import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handlers = NextAuth({
  providers: [
    CredentialsProvider ({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return { id: user.id.toString(), name: user.username, email: user.email };
          }
        } catch (error) {
          console.error("Error in authorization:", error);
        }
        return null;

      },
    }),

    CredentialsProvider({
      id: "1",
      name: "admin",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email }
          });

          if (admin && bcrypt.compareSync(credentials.password, admin.password)) {
            return { id: admin.id.toString(), name: admin.username, email: admin.email, role: 'admin' };
          }
        } catch (error) {
          console.error("Error in authorization:", error);
        }
        return null;
      }
    }),
  ],
  callbacks: {
    jwt: async ({account, token, user }) => {
      console.log(account)
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  pages: {
    signIn: '/user/login',
    error: '/auth/error',
  },
});

export {handlers as GET, handlers as POST}