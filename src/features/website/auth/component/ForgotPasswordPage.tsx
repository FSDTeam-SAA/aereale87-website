import Link from "next/link";

import { AuthField } from "./AuthField";
import { AuthShell } from "./AuthShell";

export function ForgotPasswordPage() {
  return (
    <AuthShell narrow>
      <h1 className="text-[30px] font-bold leading-[1.15]">Forgot Password</h1>
      <p className="mt-2 text-[15px] leading-[1.45] text-[var(--home-muted)]">
        Please enter the email address linked to your account. We&apos;ll send a
        one-time password (OTP) to your email for verification.
      </p>

      <form className="mt-6 space-y-5">
        <AuthField
          id="forgot-email"
          label="Email Address"
          type="email"
          placeholder="hello@example.com"
        />
        <Link
          href="/auth/verify-otp?flow=reset"
          className="flex h-14 w-full items-center justify-center bg-[var(--home-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
        >
          Send OTP
        </Link>
      </form>

      <p className="mt-6 text-center text-[13px] text-[var(--home-muted)]">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
        >
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
