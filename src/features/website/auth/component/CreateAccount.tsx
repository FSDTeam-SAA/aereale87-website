import Link from "next/link";
import { CheckSquare, LockKeyhole, Square } from "lucide-react";

import { accountTypes } from "../api/auth.data";
import { AuthField } from "./AuthField";
import { AuthShell } from "./AuthShell";
import { GoogleButton } from "./GoogleButton";

export function CreateAccount() {
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

      <form className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            id="first-name"
            label="First Name"
            placeholder="Enter name"
          />
          <AuthField id="last-name" label="Last Name" placeholder="Last name" />
        </div>
        <AuthField
          id="register-email"
          label="Email"
          type="email"
          placeholder="hello@example.com"
        />
        <AuthField
          id="register-password"
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<LockKeyhole className="size-4" />}
        />
        <AuthField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={<LockKeyhole className="size-4" />}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {accountTypes.map((type, index) => (
            <label
              key={type.id}
              className="flex cursor-pointer items-start gap-3 border border-[var(--home-gold)] bg-white p-4"
            >
              <input
                type="radio"
                name="account-type"
                defaultChecked={index === 0}
                className="sr-only"
              />
              {index === 0 ? (
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
          ))}
        </div>

        <Link
          href="/auth/verify-otp?flow=signup"
          className="flex h-14 w-full items-center justify-center bg-[var(--home-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
        >
          Create Account
        </Link>
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
