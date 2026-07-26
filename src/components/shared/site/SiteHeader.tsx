"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  LogOut,
  Menu,
  ReceiptText,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { categoryFilters, siteNavItems } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { getCart } from "@/features/website/cart/api/cart.api";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface BookCategory {
  name: string;
  count: number;
}

async function fetchCategories(): Promise<BookCategory[]> {
  try {
    const response = await api.get("/books/categories");
    const payload = response.data?.data ?? response.data;
    const rawList = Array.isArray(payload?.categories)
      ? payload.categories
      : Array.isArray(payload)
        ? payload
        : [];

    if (rawList.length > 0) {
      return rawList.map(
        (item: { name?: string; count?: number } | string) => ({
          name: typeof item === "string" ? item : item.name || String(item),
          count:
            typeof item === "object" && item !== null ? (item.count ?? 0) : 0,
        }),
      );
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return categoryFilters
    .filter((cat) => cat !== "All Categories")
    .map((name) => ({ name, count: 0 }));
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ["book-categories"],
    queryFn: fetchCategories,
  });

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: isLoggedIn,
    retry: false,
  });

  const cartCount =
    cart?.items?.reduce((total, item) => total + (item.quantity || 1), 0) ?? 0;

  const categoryList =
    categories && categories.length > 0
      ? categories
      : categoryFilters
          .filter((cat) => cat !== "All Categories")
          .map((name) => ({ name, count: 0 }));

  const navMenus: Record<string, { href: string; label: string }[]> = {
    CATEGORIES: categoryList.map((cat) => ({
      href: `/categories?view=shop&category=${encodeURIComponent(cat.name)}`,
      label: cat.name,
    })),
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
      <div className="mx-auto container flex items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:min-h-[86px] lg:px-[120px]">
        <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
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
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation"
                className="inline-flex size-10 items-center justify-center border border-[var(--home-border)] text-[var(--home-green-deep)] lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] border-l border-[var(--home-border)] bg-[var(--home-surface)] p-0 sm:max-w-[360px]"
            >
              <SheetHeader className="border-b border-[var(--home-border)] px-6 py-5 text-left">
                <SheetTitle className="text-[18px] font-semibold text-[var(--home-green-deep)]">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex h-full flex-col overflow-y-auto px-6 py-6">
                <nav aria-label="Mobile Primary">
                  <ul className="space-y-2">
                    {siteNavItems.map((item) => {
                      const menuItems = navMenus[item.label];
                      const isActive =
                        item.href === activeHref ||
                        (activeHref.startsWith("/authors") &&
                          item.href === "/authors");

                      return (
                        <li key={`mobile-${item.label}-${item.href}`}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center justify-between border-b border-[rgba(232,224,204,0.7)] py-3 text-[13px] font-semibold uppercase tracking-[0.5px]",
                                isActive
                                  ? "text-[var(--home-ink)]"
                                  : "text-[var(--home-muted)]",
                              )}
                            >
                              <span>{item.label}</span>
                              {menuItems ? (
                                <ChevronDown className="size-4 opacity-70" />
                              ) : null}
                            </Link>
                          </SheetClose>

                          {menuItems ? (
                            <div className="space-y-1 pb-3 pl-3 pt-2">
                              {menuItems.map((menuItem) => (
                                <SheetClose key={menuItem.href} asChild>
                                  <Link
                                    href={menuItem.href}
                                    className="block py-2 text-[13px] text-[var(--home-muted)] transition hover:text-[var(--home-green-deep)]"
                                  >
                                    {menuItem.label}
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-6 flex items-center gap-4 border-t border-[var(--home-border)] pt-5">
                  <SheetClose asChild>
                    <button
                      type="button"
                      aria-label="Search the catalog"
                      onClick={() => setIsSearchOpen(true)}
                      className="text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
                    >
                      <Search className="size-5" />
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/cart"
                      aria-label="Shopping cart"
                      className="relative flex items-center justify-center text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
                    >
                      <ShoppingBag className="size-5" />
                      {cartCount > 0 && (
                        <span className="absolute -right-2.5 -top-2.5 flex size-4 min-w-4 items-center justify-center rounded-full bg-[var(--home-gold)] px-1 text-[10px] font-bold text-white shadow-sm">
                          {cartCount > 99 ? "99+" : cartCount}
                        </span>
                      )}
                    </Link>
                  </SheetClose>
                </div>

                <div className="mt-6 space-y-3">
                  {!isLoggedIn ? (
                    <SheetClose asChild>
                      <Link
                        href="/auth/login"
                        className="inline-flex h-11 w-full items-center justify-center gap-2 border border-[var(--home-gold)] px-4 text-[12px] font-bold uppercase tracking-[0.52px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)]"
                      >
                        Sign In
                      </Link>
                    </SheetClose>
                  ) : (
                    <div className="space-y-2">
                      {isAuthor ? (
                        <a
                          href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001"}/author-dashboard`}
                          className="flex items-center gap-3 border border-[var(--home-border)] px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                        >
                          <User className="size-4" />
                          My Dashboard
                        </a>
                      ) : (
                        <>
                          <SheetClose asChild>
                            <Link
                              href="/my-books"
                              className="flex items-center gap-3 border border-[var(--home-border)] px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                            >
                              <BookOpen className="size-4" />
                              My Library
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href="/orders"
                              className="flex items-center gap-3 border border-[var(--home-border)] px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                            >
                              <ReceiptText className="size-4" />
                              My Orders
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href="/settings"
                              className="flex items-center gap-3 border border-[var(--home-border)] px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                            >
                              <User className="size-4" />
                              Settings
                            </Link>
                          </SheetClose>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex w-full items-center gap-3 border border-red-100 px-4 py-3 text-[13px] font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut className="size-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav aria-label="Primary" className="hidden overflow-visible lg:block">
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

        <div className="hidden items-center justify-center gap-3 lg:flex lg:justify-end">
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
            className="relative flex items-center justify-center text-[var(--home-muted)] transition-colors hover:text-[var(--home-ink)]"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2.5 -top-2.5 flex size-4 min-w-4 items-center justify-center rounded-full bg-[var(--home-gold)] px-1 text-[10px] font-bold text-white shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
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
                    <>
                      <Link
                        href="/my-books"
                        className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                      >
                        <BookOpen className="size-4" />
                        My Library
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                      >
                        <ReceiptText className="size-4" />
                        My Orders
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--home-paper)] hover:text-[var(--home-green-deep)]"
                      >
                        <User className="size-4" />
                        Settings
                      </Link>
                    </>
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
