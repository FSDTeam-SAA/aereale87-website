"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { CheckSquare, Square } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { accountTypes } from "../api/auth.data";
import { authApi, getApiErrorMessage } from "../api/auth.api";
import { AuthField } from "./AuthField";
import { AuthShell } from "./AuthShell";
import { GoogleButton } from "./GoogleButton";
import { PasswordField } from "./PasswordField";

export function CreateAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole =
    searchParams.get("role")?.toLowerCase() === "reader" ? "READER" : "AUTHOR";
  const [role, setRole] = useState<"AUTHOR" | "READER">(initialRole);
  const register = useMutation({ mutationFn: authApi.register });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    if (password !== form.get("confirmPassword")) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const email = String(form.get("email") || "")
        .trim()
        .toLowerCase();
      await register.mutateAsync({
        firstName: String(form.get("firstName") || "").trim(),
        lastName: String(form.get("lastName") || "").trim(),
        email,
        password,
        role,
      });
      toast.success(
        "Account created. Check your email for the verification code.",
      );
      router.push(
        `/auth/verify-otp?flow=signup&email=${encodeURIComponent(email)}&role=${role}`,
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <AuthShell>
      <div className="text-center">
        <h1 className="text-[30px] font-bold leading-[1.15] sm:text-[34px]">
          Join The Wonder Emporium
        </h1>
        <p className="mt-3 text-[15px] text-[var(--home-muted)]">
          Start your journey as a reader or author today.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            id="first-name"
            name="firstName"
            label="First Name"
            placeholder="Enter name"
            required
          />
          <AuthField
            id="last-name"
            name="lastName"
            label="Last Name"
            placeholder="Last name"
            required
          />
        </div>
        <AuthField
          id="register-email"
          name="email"
          label="Email"
          type="email"
          placeholder="hello@example.com"
          required
        />
        <PasswordField
          id="register-password"
          name="password"
          label="Password"
          minLength={8}
        />
        <PasswordField
          id="confirm-password"
          name="confirmPassword"
          label="Confirm Password"
          minLength={8}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {accountTypes.map((type) => {
            const value = type.id === "author" ? "AUTHOR" : "READER";
            const selected = role === value;
            return (
              <label
                key={type.id}
                className="flex cursor-pointer items-start gap-3 border border-[var(--home-gold)] bg-white p-4"
              >
                <input
                  type="radio"
                  name="account-type"
                  value={value}
                  checked={selected}
                  onChange={() => setRole(value)}
                  className="sr-only"
                />
                {selected ? (
                  <CheckSquare className="mt-1 size-5 text-[var(--home-green-deep)]" />
                ) : (
                  <Square className="mt-1 size-5 text-[var(--home-green-deep)]" />
                )}
                <span>
                  <span className="block text-[14px] font-bold">
                    {type.title}
                  </span>
                  <span className="mt-1 block text-[12px] leading-[1.35] text-[var(--home-muted)]">
                    {type.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={register.isPending}
          className="flex h-14 w-full items-center justify-center bg-[var(--home-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
        >
          {register.isPending ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4 text-[12px] uppercase text-[var(--home-muted)]">
        <span className="h-px flex-1 bg-[var(--home-border)]" />
        Or
        <span className="h-px flex-1 bg-[var(--home-border)]" />
      </div>
      <GoogleButton label="Continue with Google as Reader" />
    </AuthShell>
  );
}
