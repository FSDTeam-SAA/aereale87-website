import Link from "next/link";
import { Clock3 } from "lucide-react";

import { AuthShell } from "@/features/website/auth/component/AuthShell";

export default function PendingApprovalPage() {
  return (
    <AuthShell narrow>
      <div className="text-center">
        <Clock3 className="mx-auto size-12 text-[var(--home-gold)]" />
        <h1 className="mt-5 text-[30px] font-bold leading-[1.15]">
          Application under review
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-[var(--home-muted)]">
          Your email is verified. Please wait while an administrator reviews and
          approves your author account. We will email you when it is ready.
        </p>
        <Link
          href="/"
          className="mt-7 flex h-12 items-center justify-center bg-[var(--home-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
        >
          Return Home
        </Link>
      </div>
    </AuthShell>
  );
}
