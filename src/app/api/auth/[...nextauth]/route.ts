// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

import { refreshAccessToken } from "@/features/website/auth/api/refresh-token.api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }

          const user = data.data?.user;
          const tokens = data.data?.tokens;

          if (!user || !tokens?.accessToken || !tokens?.refreshToken) {
            throw new Error("Invalid response from server");
          }

          // Return the object that NextAuth will use as 'user' in the jwt callback
          return {
            id: user._id || user.id, // Ensure we get the ID
            name: user.firstName
              ? `${user.firstName} ${user.lastName || ""}`.trim()
              : user.username,
            email: user.email,
            image: null,
            role: user.role,
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;
      if (!account.id_token) return false;

      const response = await fetch(`${baseUrl}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: account.id_token }),
      });
      if (!response.ok) return false;

      const payload = await response.json();
      const backendUser = payload.data?.user;
      const tokens = payload.data?.tokens;
      if (!backendUser || !tokens?.accessToken || !tokens?.refreshToken) {
        return false;
      }

      user.id = backendUser.id;
      user.name = backendUser.firstName || backendUser.username;
      user.email = backendUser.email;
      user.role = backendUser.role;
      user.token = tokens.accessToken;
      user.refreshToken = tokens.refreshToken;
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 14 * 60 * 1000,
        };
      }

      // Update session trigger
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      try {
        const refreshedTokens = await refreshAccessToken(token.refreshToken);

        return {
          ...token,
          accessToken: refreshedTokens.accessToken,
          accessTokenExpires: Date.now() + 14 * 60 * 1000,
          refreshToken: refreshedTokens.refreshToken || token.refreshToken,
          error: undefined,
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
          accessTokenExpires: Date.now() + 30 * 1000,
        };
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          role: token.role,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.error = token.error;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
