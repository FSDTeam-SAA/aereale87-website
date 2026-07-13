import type { InputHTMLAttributes, ReactNode } from "react";

export function AuthField({
  id,
  label,
  icon,
  action,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-[13px] font-semibold text-[var(--home-green-deep)]">
        {label}
      </span>
      <span className="mt-2 flex h-12 items-center border border-[var(--home-border)] bg-[var(--home-paper)] px-3 transition focus-within:border-[var(--home-gold)]">
        {icon ? (
          <span className="mr-3 text-[var(--home-muted)]">{icon}</span>
        ) : null}
        <input
          id={id}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--home-green-deep)] outline-none placeholder:text-[var(--home-muted)]"
          {...props}
        />
        {action}
      </span>
    </label>
  );
}
