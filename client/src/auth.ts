import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACK_END_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.succeeded && data.token) {
          const token = data.token;

          const decoded = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );

          return {
            id: decoded.nameid,
            email: decoded.email,
            name: decoded.unique_name,
            role: decoded.role,
            token,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.jwt;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.jwt = token.accessToken as string;
      session.user.role = token.role as string;
      session.user.name = token.name as string;
      return session;
    },
  },
  pages: {
    signIn: "auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
