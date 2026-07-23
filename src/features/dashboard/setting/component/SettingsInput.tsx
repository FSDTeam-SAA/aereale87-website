export function SettingsInput({
  label,
  name,
  defaultValue,
  value,
  placeholder,
  type = "text",
  action,
  readOnly,
  onChange,
}: {
  label: string;
  name?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  action?: React.ReactNode;
  readOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block">
      <span className="text-[14px] font-medium text-[var(--home-green-deep)]">
        {label}
      </span>
      <span className="mt-2 flex h-12 items-center border border-[var(--home-border)] bg-[var(--home-surface)] px-4 focus-within:border-[var(--home-gold)]">
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--home-green-deep)] outline-none placeholder:text-[var(--home-muted)]"
        />
        {action}
      </span>
    </label>
  );
}
