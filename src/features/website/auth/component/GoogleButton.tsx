"use client";

import { signIn } from "next-auth/react";

export function GoogleButton({
  label = "Sign in with Google",
}: {
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => void signIn("google", { callbackUrl: "/" })}
      className="flex h-12 w-full items-center justify-center gap-3 border border-[var(--home-border)] bg-white text-[14px] font-medium text-[var(--home-green-deep)] transition hover:border-[var(--home-gold)]"
    >
      <span className="text-[20px] font-bold text-[#4285f4]">G</span>
      {label}
    </button>
  );
}
