"use client";

import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { AuthShell } from "./AuthShell";
import { authApi, getApiErrorMessage } from "../api/auth.api";
import { PasswordField } from "./PasswordField";

export function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset = useMutation({ mutationFn: authApi.resetPassword });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    if (password !== form.get("confirmPassword")) {
      toast.error("Passwords do not match.");
      return;
    }
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");
    if (!email || !otp) {
      toast.error("Your reset session is incomplete. Request a new code.");
      router.push("/auth/forgot-password");
      return;
    }
    try {
      await reset.mutateAsync({ email, otp, password });
      toast.success("Password reset successfully. You can now sign in.");
      router.push("/auth/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <AuthShell narrow>
      <h1 className="text-[30px] font-bold leading-[1.15]">New Password</h1>
      <p className="mt-2 text-[15px] leading-[1.45] text-[var(--home-muted)]">
        Please create your new password.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <PasswordField
          id="new-password"
          name="password"
          label="Create a password"
          minLength={8}
        />
        <PasswordField
          id="new-password-confirm"
          name="confirmPassword"
          label="Confirm Password"
          minLength={8}
        />
        <button
          type="submit"
          disabled={reset.isPending}
          className="flex h-14 w-full items-center justify-center bg-[var(--home-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
        >
          {reset.isPending ? "Updating..." : "Continue"}
        </button>
      </form>
    </AuthShell>
  );
}
