// src/Providers/Provider.tsx

"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect, type ReactNode } from "react";

function AuthErrorListener({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      void signOut({ callbackUrl: "/auth/login" });
    }
  }, [session]);

  return <>{children}</>;
}

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthErrorListener>{children}</AuthErrorListener>
    </SessionProvider>
  );
}
