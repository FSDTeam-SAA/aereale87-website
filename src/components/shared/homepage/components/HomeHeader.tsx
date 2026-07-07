import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavItem } from "../homepage.data";

export function HomeHeader({ items }: { items: NavItem[] }) {
  return (
    <header className="bg-[var(--home-surface)]">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-4 px-5 py-4 sm:px-8 lg:h-[100px] lg:flex-row lg:items-center lg:justify-between lg:px-[120px]">
        <Link href="#top" className="shrink-0">
          <Image
            src="/home/logo-header.png"
            alt="The Wonder Emporium logo"
            width={150}
            height={90}
            priority
            className="h-auto w-[104px] sm:w-[120px] lg:w-[150px]"
          />
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:gap-x-9">
            {items.map((item, index) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-[14px] font-medium uppercase tracking-[0.2px] transition-colors duration-200 lg:text-[20px]",
                    index === 0
                      ? "font-bold text-[var(--home-ink)]"
                      : "text-[var(--home-muted)] hover:text-[var(--home-ink)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-center gap-4 lg:justify-end">
          <button
            type="button"
            aria-label="Search the catalog"
            className="text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
          >
            <Search className="size-5 lg:size-6" />
          </button>
          <button
            type="button"
            aria-label="Shopping cart, 0 items"
            className="relative text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
          >
            <ShoppingBag className="size-5 lg:size-6" />
            <span className="absolute -right-2 -top-2 inline-flex size-4 items-center justify-center rounded-full bg-[var(--home-gold)] text-[10px] font-semibold text-[var(--home-ink)]">
              0
            </span>
          </button>
          <button
            type="button"
            className="inline-flex h-[44px] items-center gap-2 border border-[var(--home-gold)] px-4 text-[13px] font-bold uppercase tracking-[0.52px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)] lg:h-[46px]"
            aria-label="Account menu"
          >
            Account
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
