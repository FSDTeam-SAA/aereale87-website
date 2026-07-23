"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authApi, getApiErrorMessage } from "../api/auth.api";
import { AuthShell } from "./AuthShell";

export function EnterOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const flow = searchParams.get("flow") === "reset" ? "reset" : "signup";
  const role = searchParams.get("role");
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [cooldown, setCooldown] = useState(60);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const verify = useMutation({ mutationFn: authApi.verifyEmail });
  const verifyReset = useMutation({
    mutationFn: authApi.verifyPasswordResetOtp,
  });
  const resend = useMutation({
    mutationFn: () =>
      flow === "reset"
        ? authApi.resendPasswordReset(email)
        : authApi.resendVerification(email),
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(
      () => setCooldown((value) => value - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = digits.join("");
    if (!email || code.length !== 6) {
      toast.error("Enter the complete 6-digit code.");
      return;
    }
    if (flow === "reset") {
      try {
        await verifyReset.mutateAsync({ email, otp: code });
        router.push(
          `/auth/new-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(code)}`,
        );
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      }
      return;
    }
    try {
      await verify.mutateAsync({ email, code });
      toast.success("Email verified successfully.");
      router.push(role === "AUTHOR" ? "/auth/pending-approval" : "/auth/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  async function handleResend() {
    if (!email) return;
    try {
      await resend.mutateAsync();
      setCooldown(60);
      toast.success("A new code has been sent.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <AuthShell narrow>
      <h1 className="text-[30px] font-bold leading-[1.15]">Enter OTP</h1>
      <p className="mt-2 text-[15px] leading-[1.45] text-[var(--home-muted)]">
        An OTP has been sent to your email address. Please verify it below.
      </p>

      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 gap-3">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element;
              }}
              aria-label={`OTP digit ${index + 1}`}
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={digit}
              onChange={(event) => {
                const value = event.target.value.replace(/\D/g, "").slice(-1);
                setDigits((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? value : item,
                  ),
                );
                if (value) inputs.current[index + 1]?.focus();
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && !digits[index])
                  inputs.current[index - 1]?.focus();
              }}
              className="h-16 min-w-0 border border-[var(--home-border)] bg-[var(--home-paper)] text-center text-[24px] font-bold text-[var(--home-green-deep)] outline-none transition focus:border-[var(--home-gold)]"
            />
          ))}
        </div>
        <p className="mt-4 text-center text-[13px] text-[var(--home-muted)]">
          Didn&apos;t Receive OTP?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resend.isPending || !email || cooldown > 0}
            className="font-semibold text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
          >
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : resend.isPending
                ? "Sending..."
                : "Resend OTP"}
          </button>
        </p>
        <button
          type="submit"
          disabled={verify.isPending || verifyReset.isPending}
          className="mt-6 flex h-14 w-full items-center justify-center bg-[var(--home-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
        >
          {verify.isPending || verifyReset.isPending
            ? "Verifying..."
            : "Verify"}
        </button>
      </form>
    </AuthShell>
  );
}
