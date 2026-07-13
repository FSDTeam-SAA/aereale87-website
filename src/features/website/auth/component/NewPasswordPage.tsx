import Link from "next/link";
import { EyeOff, LockKeyhole } from "lucide-react";

import { AuthField } from "./AuthField";
import { AuthShell } from "./AuthShell";

export function NewPasswordPage() {
  return (
    <AuthShell narrow>
      <h1 className="text-[30px] font-bold leading-[1.15]">New Password</h1>
      <p className="mt-2 text-[15px] leading-[1.45] text-[var(--home-muted)]">
        Please create your new password.
      </p>

      <form className="mt-8 space-y-5">
        <AuthField
          id="new-password"
          label="Create a password"
          type="password"
          placeholder="••••••••"
          icon={<LockKeyhole className="size-4" />}
          action={<EyeOff className="size-4 text-[var(--home-green)]" />}
        />
        <AuthField
          id="new-password-confirm"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={<LockKeyhole className="size-4" />}
          action={<EyeOff className="size-4 text-[var(--home-green)]" />}
        />
        <Link
          href="/auth/login"
          className="flex h-14 w-full items-center justify-center bg-[var(--home-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
        >
          Continue
        </Link>
      </form>
    </AuthShell>
  );
}
