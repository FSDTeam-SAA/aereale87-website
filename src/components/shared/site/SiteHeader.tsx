import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, ShoppingBag } from "lucide-react";

import { siteNavItems } from "@/data/catalog";
import { cn } from "@/lib/utils";

const navMenus: Record<string, { href: string; label: string }[]> = {
  CATEGORIES: [
    {
      href: "/categories?view=shop&category=Leadership",
      label: "Leadership",
    },
    {
      href: "/categories?view=shop&category=Children%27s",
      label: "Children's",
    },
    {
      href: "/categories?view=shop&category=Faith%20%26%20Wisdom",
      label: "Faith & Wisdom",
    },
    { href: "/categories?view=shop&category=Business", label: "Business" },
  ],
};

export function SiteHeader({
  ctaLabel = "Account",
  ctaHref = "/auth/login",
  activeHref = "/categories?view=categories",
}: {
  ctaLabel?: string;
  ctaHref?: string;
  activeHref?: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(232,224,204,0.7)] bg-[var(--home-surface)]/95 backdrop-blur">
      <div className="mx-auto container flex  flex-col gap-4 px-5 py-4 sm:px-8 lg:min-h-[86px] lg:flex-row lg:items-center lg:justify-between lg:px-[120px]">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.svg"
              alt="The Wonder Emporium logo"
              width={220}
              height={220}
              priority
              className="h-auto w-[130px] sm:w-[150px] lg:w-[120px]"
            />
          </Link>
          <button
            type="button"
            aria-label="Open navigation"
            className="inline-flex size-10 items-center justify-center border border-[var(--home-border)] text-[var(--home-green-deep)] lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>

        <nav aria-label="Primary" className="overflow-visible">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:gap-x-7 xl:gap-x-9">
            {siteNavItems.map((item) => {
              const menuItems = navMenus[item.label];
              const isActive =
                item.href === activeHref ||
                (activeHref.startsWith("/authors") && item.href === "/authors");

              return (
                <li
                  key={`${item.label}-${item.href}`}
                  className="group relative flex items-center"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 py-2 text-[12px] font-medium uppercase transition-colors duration-200 sm:text-[13px] lg:text-[14px]",
                      isActive
                        ? "font-bold text-[var(--home-ink)]"
                        : "text-[var(--home-muted)] hover:text-[var(--home-ink)]",
                    )}
                  >
                    {item.label}
                    {menuItems ? (
                      <ChevronDown className="size-3.5 text-current transition-transform group-hover:rotate-180" />
                    ) : null}
                  </Link>

                  {menuItems ? (
                    <div className="invisible absolute left-1/2 top-full z-50 w-[220px] -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="border border-[var(--home-border)] bg-white p-2 shadow-[0_18px_45px_rgba(27,46,36,0.12)]">
                        {menuItems.map((menuItem) => (
                          <Link
                            key={menuItem.href}
                            href={menuItem.href}
                            className="block px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                          >
                            {menuItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-center gap-3 lg:justify-end">
          <button
            type="button"
            aria-label="Search the catalog"
            className="text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
          >
            <Search className="size-5" />
          </button>
          <Link
            href="/cart"
            aria-label="Shopping cart, 3 items"
            className="relative text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
          >
            <ShoppingBag className="size-5" />
            <span className="absolute -right-2 -top-2 inline-flex size-4 items-center justify-center rounded-full bg-[var(--home-gold)] text-[10px] font-semibold text-[var(--home-ink)]">
              3
            </span>
          </Link>
          <Link
            href={ctaHref}
            className="inline-flex h-10 items-center gap-2 border border-[var(--home-gold)] px-4 text-[12px] font-bold uppercase tracking-[0.52px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)] lg:h-11"
          >
            {ctaLabel}
            <ChevronDown className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
