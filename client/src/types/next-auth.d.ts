// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      jwt?: string;
      role?: string;
      image?: string;

    };
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    jwt?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwt?: string;
    role?: string;
  }
}
