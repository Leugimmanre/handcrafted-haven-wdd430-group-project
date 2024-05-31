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
      async authorize(credentials, req) {
        // const user = {
        //   id: "1",
        //   username: "Miguel",
        //   email: "miguel@miguel.com",
        //   password: "123456",
        // };
        // return user;

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