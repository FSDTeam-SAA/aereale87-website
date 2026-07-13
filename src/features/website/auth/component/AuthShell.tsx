import type { ReactNode } from "react";

export function AuthShell({
  children,
  narrow = false,
}: {
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <main className="min-h-screen bg-[var(--home-surface)] px-5 py-16 text-[var(--home-green-deep)] sm:px-8">
      <div
        className={`mx-auto border border-[var(--home-border)] bg-white p-6 shadow-[0_8px_30px_rgba(27,46,36,0.04)] sm:p-8 ${
          narrow ? "max-w-[560px]" : "max-w-[640px]"
        }`}
      >
        {children}
      </div>
    </main>
  );
}
