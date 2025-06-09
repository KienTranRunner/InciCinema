import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Email/Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();

        if (res.ok && data.succeeded && data.token) {
          const base64Payload = data.token.split(".")[1];
          const decodedJson = Buffer.from(base64Payload, "base64").toString(
            "utf-8"
          );
          const decoded = JSON.parse(decodedJson);

          return {
            id: decoded.nameid,
            email: decoded.email,
            name: decoded.unique_name,
            role: decoded.role,
            accessToken: data.token,
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
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.jwt ?? user.jwt;
      }

      if (account?.provider === "google" && profile) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/auth/google-login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idToken: account.id_token,
            }),
          }
        );

        const data = await res.json();

        if (res.ok && data.token) {
          const base64Payload = data.token.split(".")[1];
          const decodedJson = Buffer.from(base64Payload, "base64").toString(
            "utf-8"
          );
          const decoded = JSON.parse(decodedJson);

          token.id = decoded.nameid;
          token.email = decoded.email;
          token.name = decoded.unique_name || profile.name;
          token.role = Array.isArray(decoded.role)
            ? decoded.role[0]
            : decoded.role;
          token.accessToken = data.token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      session.user.jwt = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
