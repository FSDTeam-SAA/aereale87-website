"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { siteNavItems } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

interface BookCategory {
  name: string;
  count: number;
}

async function fetchCategories() {
  const response = await api.get<{ categories: BookCategory[]; total: number }>(
    "/books/categories",
  );
  return response.data.categories;
}

export function SiteHeader({
  activeHref = "/categories?view=categories",
}: {
  activeHref?: string;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const isAuthor = role === "AUTHOR";
  const isLoggedIn = status === "authenticated";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categories } = useQuery({
    queryKey: ["book-categories"],
    queryFn: fetchCategories,
  });

  const navMenus: Record<string, { href: string; label: string }[]> = {
    CATEGORIES:
      categories?.map((cat) => ({
        href: `/categories?view=shop&category=${encodeURIComponent(cat.name)}`,
        label: cat.name,
      })) ?? [],
  };

  function submitSearch() {
    const params = new URLSearchParams({ view: "shop" });
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }
    router.push(`/categories?${params.toString()}`);
    setIsSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(232,224,204,0.7)] bg-[var(--home-surface)]/95 backdrop-blur">
      <div className="mx-auto container flex flex-col gap-4 px-5 py-4 sm:px-8 lg:min-h-[86px] lg:flex-row lg:items-center lg:justify-between lg:px-[120px]">
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
          <div className="relative">
            <button
              type="button"
              aria-label="Search the catalog"
              onClick={() => setIsSearchOpen((current) => !current)}
              className="text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
            >
              <Search className="size-5" />
            </button>
            {isSearchOpen ? (
              <div className="absolute right-0 top-full z-50 mt-3 w-[280px] border border-[var(--home-border)] bg-white p-3 shadow-[0_18px_45px_rgba(27,46,36,0.12)]">
                <label htmlFor="site-search" className="sr-only">
                  Search books and authors
                </label>
                <input
                  id="site-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      submitSearch();
                    }
                  }}
                  placeholder="Search books and authors"
                  className="h-11 w-full border border-[var(--home-border)] px-4 text-[14px] outline-none transition focus:border-[var(--home-gold)]"
                />
                <button
                  type="button"
                  onClick={submitSearch}
                  className="mt-3 flex h-10 w-full items-center justify-center bg-[var(--home-gold)] text-[12px] font-bold uppercase tracking-[0.52px] text-white transition hover:bg-[var(--home-green)]"
                >
                  Search catalog
                </button>
              </div>
            ) : null}
          </div>
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
          >
            <ShoppingBag className="size-5" />
          </Link>

          {/* ── Account CTA ── */}
          {!isLoggedIn ? (
            /* Guest → Sign In button */
            <Link
              href="/auth/login"
              className="inline-flex h-10 items-center gap-2 border border-[var(--home-gold)] px-4 text-[12px] font-bold uppercase tracking-[0.52px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)] lg:h-11"
            >
              Sign In
              <ChevronDown className="size-3.5" />
            </Link>
          ) : (
            /* Logged in → dropdown */
            <div className="group relative">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 border border-[var(--home-gold)] px-4 text-[12px] font-bold uppercase tracking-[0.52px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)] lg:h-11"
              >
                {isAuthor ? "My Dashboard" : "My Account"}
                <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
              </button>

              <div className="invisible absolute right-0 top-full z-50 w-[200px] pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="border border-[var(--home-border)] bg-white shadow-[0_18px_45px_rgba(27,46,36,0.12)]">
                  {/* Author-specific links */}
                  {isAuthor && (
                    <>
                      <a
                        href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001"}/author-dashboard`}
                        className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                      >
                        <User className="size-4" />
                        My Dashboard
                      </a>
                    </>
                  )}

                  {/* Regular user links */}
                  {!isAuthor && (
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                    >
                      <User className="size-4" />
                      My Account
                    </Link>
                  )}

                  <div className="mx-4 border-t border-[var(--home-border)]" />
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
