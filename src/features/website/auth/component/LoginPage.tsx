"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Mail } from "lucide-react";

import { AuthField } from "./AuthField";
import { AuthShell } from "./AuthShell";
import { GoogleButton } from "./GoogleButton";
import { PasswordField } from "./PasswordField";

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    const result = await signIn("credentials", {
      email: String(form.get("email") || "")
        .trim()
        .toLowerCase(),
      password: String(form.get("password") || ""),
      redirect: false,
    });
    setPending(false);

    if (!result?.ok) {
      toast.error(
        result?.error?.includes("Account is not active")
          ? "Your account is awaiting administrator approval."
          : result?.error || "Invalid email or password.",
      );
      return;
    }

    toast.success("Welcome back.");

    // Determine redirect destination based on role embedded in the session
    // We use getSession() after signIn so the JWT callback has already run
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    const role = (session?.user as { role?: string } | undefined)?.role;

    const callbackUrl = searchParams.get("callbackUrl");
    const dashboardUrl =
      process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";
    if (callbackUrl) {
      router.push(callbackUrl);
    } else if (role === "AUTHOR") {
      // Redirect to the dashboard app — open its login page with callbackUrl set to author-dashboard
      // (The dashboard's own login creates a valid session for that domain)
      window.location.href = `${dashboardUrl}?callbackUrl=%2Fauthor-dashboard`;
      return;
    } else {
      router.push("/");
    }
    router.refresh();
  }

  return (
    <AuthShell>
      <div className="text-center">
        <Image
          src="/home/logo-header.png"
          alt="The Wonder Emporium logo"
          width={250}
          height={150}
          priority
          className="mx-auto h-auto w-[210px] sm:w-[250px]"
        />
        <h1 className="mt-8 text-[30px] font-bold leading-[1.15] sm:text-[34px]">
          Welcome Back
        </h1>
        <p className="mt-3 text-[15px] text-[var(--home-muted)]">
          Sign in to continue your journey.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <AuthField
          id="login-email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="size-4" />}
          required
        />
        <PasswordField id="login-password" name="password" label="Password" />
        <div className="flex items-center justify-between gap-4 text-[13px]">
          <label className="flex items-center gap-2 text-[var(--home-green-deep)]">
            <input
              type="checkbox"
              className="size-3 accent-[var(--home-gold)]"
            />
            Remember me
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
          >
            Forgot password?
          </Link>
        </div>
        <p className="text-center text-[13px] text-[var(--home-muted)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
          >
            Register Now
          </Link>
        </p>
        <button
          type="submit"
          disabled={pending}
          className="h-14 w-full bg-[var(--home-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
        >
          {pending ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4 text-[12px] uppercase text-[var(--home-muted)]">
        <span className="h-px flex-1 bg-[var(--home-border)]" />
        Or
        <span className="h-px flex-1 bg-[var(--home-border)]" />
      </div>
      <GoogleButton />
    </AuthShell>
  );
}
