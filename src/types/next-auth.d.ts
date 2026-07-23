import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
      role: "READER" | "AUTHOR" | "ADMIN" | "SUPERADMIN" | string;
    };
    accessToken: string;
    refreshToken: string;
    error?: "RefreshAccessTokenError";
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: "READER" | "AUTHOR" | "ADMIN" | "SUPERADMIN" | string;
    token: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: "READER" | "AUTHOR" | "ADMIN" | "SUPERADMIN" | string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: "RefreshAccessTokenError";
  }
}
