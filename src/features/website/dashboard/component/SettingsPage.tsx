import Image from "next/image";
import { Copy, EyeOff } from "lucide-react";

import { DashboardShell } from "./DashboardShell";

function SettingsInput({
  label,
  defaultValue,
  placeholder,
  type = "text",
  action,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  action?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[14px] font-medium text-[var(--home-green-deep)]">
        {label}
      </span>
      <span className="mt-2 flex h-12 items-center border border-[var(--home-border)] bg-[var(--home-surface)] px-4 focus-within:border-[var(--home-gold)]">
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--home-green-deep)] outline-none placeholder:text-[var(--home-muted)]"
        />
        {action}
      </span>
    </label>
  );
}

export function SettingsPage() {
  return (
    <DashboardShell activeHref="/settings" title="Settings">
      <div className="space-y-4">
        <section className="border border-[var(--home-border)] bg-white p-5 sm:p-6">
          <h2 className="text-[18px] font-bold">Profile Update</h2>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Image
              src="/home/reviewer-1.png"
              alt="Wade Warren"
              width={96}
              height={96}
              className="size-20 rounded-full object-cover sm:size-24"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[18px] font-bold text-[var(--home-green-deep)]">
                  Wade Warren
                </h3>
                <span className="rounded-full border border-[var(--home-gold)] bg-[rgba(207,175,69,0.12)] px-3 py-1 text-[12px] font-semibold text-[var(--home-gold)]">
                  Bronze
                </span>
              </div>
              <p className="mt-2 inline-flex items-center gap-3 text-[15px] text-[var(--home-muted)]">
                wade.warren@example.com
                <button
                  type="button"
                  aria-label="Copy email"
                  className="text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
                >
                  <Copy className="size-4" />
                </button>
              </p>
            </div>
          </div>

          <form className="mt-8 grid gap-5 md:grid-cols-2">
            <SettingsInput label="First Name" defaultValue="Wade" />
            <SettingsInput label="Last Name" defaultValue="Warren" />
            <SettingsInput
              label="Password"
              type="password"
              defaultValue="password123"
              action={<EyeOff className="size-4 text-[var(--home-muted)]" />}
            />
            <SettingsInput
              label="Phone Number"
              defaultValue="(406) 555-0120"
              action={
                <span className="ml-3 flex items-center gap-2 border-l border-[var(--home-border)] pl-3 text-[18px]">
                  🇺🇸
                  <span className="text-[10px] text-[var(--home-muted)]">
                    ▾
                  </span>
                </span>
              }
            />
            <SettingsInput
              label="E-mail"
              defaultValue="wade.warren@example.com"
            />
            <SettingsInput
              label="Location"
              defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486"
            />
          </form>
        </section>

        <section className="border border-[var(--home-border)] bg-white p-5 sm:p-6">
          <h2 className="text-[18px] font-bold">Change Password</h2>
          <form className="mt-5 space-y-5">
            <SettingsInput
              label="Current Password"
              placeholder="Enter password"
              type="password"
              action={<EyeOff className="size-4 text-[var(--home-muted)]" />}
            />
            <button
              type="button"
              className="text-[13px] font-medium text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
            >
              Forgot Current Password? Click here
            </button>
            <SettingsInput
              label="New Password"
              placeholder="Enter password"
              type="password"
              action={<EyeOff className="size-4 text-[var(--home-muted)]" />}
            />
            <SettingsInput
              label="Re-enter Password"
              placeholder="Enter password"
              type="password"
              action={<EyeOff className="size-4 text-[var(--home-muted)]" />}
            />
            <button
              type="button"
              className="h-12 w-full bg-[var(--home-gold)] px-6 text-[13px] font-bold text-white transition hover:bg-[var(--home-green)]"
            >
              Save Change
            </button>
          </form>
        </section>
      </div>
    </DashboardShell>
  );
}
