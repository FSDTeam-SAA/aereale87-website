"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

import { AuthField } from "./AuthField";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  minLength?: number;
};

export function PasswordField({
  id,
  name,
  label,
  placeholder = "••••••••",
  minLength,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthField
      id={id}
      name={name}
      label={label}
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      icon={<LockKeyhole className="size-4" />}
      action={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="ml-2 text-[var(--home-green)] transition hover:text-[var(--home-gold)]"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
      minLength={minLength}
      required
    />
  );
}
