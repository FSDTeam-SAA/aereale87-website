export function SettingsInput({
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
