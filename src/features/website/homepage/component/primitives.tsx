import Link from "next/link";

import { cn } from "@/lib/utils";

export function HomeSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("px-5 py-14 sm:px-8 lg:px-[120px] lg:py-20", className)}
    >
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </section>
  );
}

export function HomeCta({
  href,
  children,
  className,
  invert = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-[58px] items-center justify-center border px-8 text-center text-[16px] font-bold uppercase tracking-[0.64px] transition duration-300 [font-family:var(--font-display)]",
        invert
          ? "border-[var(--home-gold)] bg-[var(--home-gold)] text-white hover:bg-transparent hover:text-[var(--home-gold)]"
          : "border-[var(--home-gold)] bg-transparent text-[var(--home-gold)] hover:bg-[var(--home-gold)] hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  title,
  subtitle,
  ctaHref,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  ctaHref?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        centered && "items-center text-center",
      )}
    >
      <div className={cn("space-y-4", centered && "max-w-[672px]")}>
        <h2 className="text-[38px] leading-10 font-semibold text-[var(--home-green-deep)] sm:text-[48px]">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-[20px] leading-6 text-[var(--home-muted)] sm:text-[24px]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {ctaHref ? (
        <HomeCta href={ctaHref} className="h-[58px] w-full sm:w-[151px]">
          View All
        </HomeCta>
      ) : null}
    </div>
  );
}
