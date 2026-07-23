"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { CategoryTile } from "@/data/catalog";
import {
  AuthorCard,
  FeaturedBanner,
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";
import { SiteHeader } from "@/components/shared/site/SiteHeader";
import { CategoryCard } from "./CategoryCard";
import { CategoryProductCard } from "./CategoryProductCard";
import {
  fetchBookCategories,
  fetchCatalogBooks,
  fetchFoundingAuthors,
  mapCatalogBookToProduct,
} from "../api/catalog.api";

const pageSize = 12;
const allCategories = "All Categories";
const allAuthors = "All Authors";

export function CategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const queryCategory = searchParams.get("category");
  const queryFormat = searchParams.get("format");
  const querySearch = searchParams.get("search");
  const showCategoryCards = view !== "shop";
  const activeNavHref =
    view === "shop" ? "/categories?view=shop" : "/categories?view=categories";

  const selectedCategory = queryCategory || allCategories;
  const [selectedAuthor, setSelectedAuthor] = useState<string>(allAuthors);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(
    queryFormat ? [queryFormat] : [],
  );
  const searchTerm = querySearch || "";
  const [maxPrice, setMaxPrice] = useState(0);
  const [page, setPage] = useState(1);
  const maxPriceTouchedRef = useRef(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const categoriesQuery = useQuery({
    queryKey: ["book-categories"],
    queryFn: fetchBookCategories,
  });
  const booksQuery = useQuery({
    queryKey: ["approved-books", selectedCategory, searchTerm],
    queryFn: () =>
      fetchCatalogBooks({
        limit: 100,
        search: searchTerm || undefined,
        category:
          selectedCategory !== allCategories ? selectedCategory : undefined,
      }),
  });
  const authorsQuery = useQuery({
    queryKey: ["founding-authors"],
    queryFn: fetchFoundingAuthors,
  });

  const products = useMemo(
    () => (booksQuery.data?.books ?? []).map(mapCatalogBookToProduct),
    [booksQuery.data],
  );

  const categoryFilters = useMemo(
    () => [
      allCategories,
      ...(categoriesQuery.data?.categories.map((category) => category.name) ??
        []),
    ],
    [categoriesQuery.data],
  );

  const authorFilters = useMemo(
    () => [
      { id: allAuthors, name: allAuthors },
      ...(authorsQuery.data?.authors ?? []).map((author) => {
        const name = author.profile
          ? `${author.profile.firstName || ""} ${author.profile.lastName || ""}`.trim() ||
            author.username
          : author.username;
        return { id: author.id, name };
      }),
    ],
    [authorsQuery.data],
  );

  const formatFilters = useMemo(
    () => [
      ...new Set(
        products.flatMap((product) =>
          product.formats.map((format) => format.label),
        ),
      ),
    ],
    [products],
  );

  const dynamicMaxPrice = useMemo(() => {
    const prices = products.map((product) =>
      Number(product.price.replace(/[^0-9.]/g, "")),
    );
    return prices.length ? Math.ceil(Math.max(...prices)) : 0;
  }, [products]);

  const categoryTiles: CategoryTile[] = useMemo(() => {
    const icons: CategoryTile["icon"][] = ["spark", "star", "tablet"];
    return (categoriesQuery.data?.categories ?? []).map((cat, index) => ({
      title: cat.name,
      subtitle: `${cat.count} ${cat.count === 1 ? "book" : "books"}`,
      href: `/categories?view=shop&category=${encodeURIComponent(cat.name)}`,
      icon: icons[index % icons.length],
    }));
  }, [categoriesQuery.data]);

  useEffect(() => {
    if (!maxPriceTouchedRef.current && dynamicMaxPrice) {
      setMaxPrice(dynamicMaxPrice);
    }
  }, [dynamicMaxPrice]);

  function updateShopParams(next: { category?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", "shop");
    if (next.category === allCategories) {
      params.delete("category");
    } else if (next.category) {
      params.set("category", next.category);
    }
    router.replace(`/categories?${params.toString()}`);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const numericPrice = Number(product.price.replace(/[^0-9.]/g, ""));

      const categoryMatch =
        selectedCategory === allCategories ||
        product.filterCategory === selectedCategory;

      const authorMatch =
        selectedAuthor === allAuthors ||
        booksQuery.data?.books.find((book) => book.id === product.slug)?.author
          ?.id === selectedAuthor;

      const formatMatch =
        selectedFormats.length === 0 ||
        selectedFormats.some((format) =>
          product.formats.some(
            (productFormat) => productFormat.label === format,
          ),
        );

      const priceMatch = maxPrice === 0 || numericPrice <= maxPrice;
      const searchMatch =
        !searchTerm ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        categoryMatch && authorMatch && formatMatch && priceMatch && searchMatch
      );
    });
  }, [
    booksQuery.data,
    maxPrice,
    products,
    searchTerm,
    selectedAuthor,
    selectedCategory,
    selectedFormats,
  ]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, pageCount);

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return filteredProducts.slice(start, start + pageSize);
  }, [currentPage, filteredProducts]);

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, filteredProducts.length);

  const paginationItems = [1, 2, 3, "...", pageCount];

  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref={activeNavHref} />

      {showCategoryCards ? (
        <section className="px-5 py-16 sm:px-8 lg:px-[120px] lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-[1440px] text-center">
              <h1 className="text-[42px] leading-[1.2] font-bold text-[var(--home-green-deep)] lg:text-[48px]">
                Curated Categories
              </h1>
              <p className="mx-auto mt-4 max-w-[933px] text-[20px] leading-[1.2] text-[var(--home-muted)] lg:text-[24px]">
                Explore our carefully selected collections designed to elevate
                your mind and spirit.
              </p>
            </div>

            <div className="relative mx-auto mt-10 max-w-[1440px]">
              <button
                type="button"
                aria-label="Scroll categories left"
                onClick={() =>
                  categoryScrollRef.current?.scrollBy({
                    left: -240,
                    behavior: "smooth",
                  })
                }
                className="absolute left-0 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center border border-[var(--home-border)] bg-white/90 shadow-sm transition hover:bg-[var(--home-paper)]"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div
                ref={categoryScrollRef}
                className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-10 py-2"
              >
                {(categoriesQuery.data?.categories ?? []).map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/categories?view=shop&category=${encodeURIComponent(cat.name)}`}
                    className="shrink-0 rounded-full border border-[var(--home-border)] bg-white px-5 py-2.5 text-[13px] font-medium text-[var(--home-green-deep)] transition hover:border-[var(--home-gold)] hover:bg-[var(--home-surface)] hover:text-[var(--home-green-deep)]"
                  >
                    {cat.name}
                    <span className="ml-2 text-[11px] text-[var(--home-muted)]">
                      ({cat.count})
                    </span>
                  </Link>
                ))}
                {categoriesQuery.isLoading ? (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-28 shrink-0 animate-pulse rounded-full border border-[var(--home-border)] bg-gray-100"
                      />
                    ))}
                  </>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Scroll categories right"
                onClick={() =>
                  categoryScrollRef.current?.scrollBy({
                    left: 240,
                    behavior: "smooth",
                  })
                }
                className="absolute right-0 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center border border-[var(--home-border)] bg-white/90 shadow-sm transition hover:bg-[var(--home-paper)]"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="mx-auto mt-12 grid max-w-[1440px] gap-8 lg:grid-cols-3">
              {categoryTiles.map((tile) => (
                <CategoryCard key={tile.title} tile={tile} />
              ))}
              {categoriesQuery.isLoading ? (
                <p className="col-span-full border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
                  Loading categories...
                </p>
              ) : null}
              {!categoriesQuery.isLoading && !categoryTiles.length ? (
                <p className="col-span-full border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
                  No categories available.
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 xl:flex-row xl:items-start">
          <aside className="w-full xl:sticky xl:top-8 xl:max-w-[320px]">
            <p className="mb-4 text-[16px] leading-[1.2] text-[var(--home-muted)]">
              Showing {filteredProducts.length === 0 ? 0 : startIndex}-
              {endIndex} of {filteredProducts.length} Books
            </p>
            {searchTerm ? (
              <p className="mb-4 text-[14px] text-[var(--home-muted)]">
                Search results for{" "}
                <span className="font-semibold text-[var(--home-green-deep)]">
                  &quot;{searchTerm}&quot;
                </span>
              </p>
            ) : null}

            <div className="space-y-6">
              <div className="border border-[var(--home-border)] bg-white p-4">
                <h2 className="text-[18px] font-semibold text-[var(--home-green-deep)]">
                  Categories
                </h2>
                <div className="mt-4 space-y-3">
                  {categoryFilters.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center justify-between gap-3 text-[14px] text-[var(--home-muted)]"
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => {
                            updateShopParams({ category });
                            setPage(1);
                          }}
                          className="size-3 accent-[var(--home-green)]"
                        />
                        {category}
                      </span>
                      <span>
                        {category === allCategories
                          ? (categoriesQuery.data?.total ?? products.length)
                          : (categoriesQuery.data?.categories.find(
                              (item) => item.name === category,
                            )?.count ?? "")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border border-[var(--home-border)] bg-white p-4">
                <h2 className="text-[18px] font-semibold text-[var(--home-green-deep)]">
                  Authors
                </h2>
                <div className="mt-4 space-y-3">
                  {authorFilters.map((author) => (
                    <label
                      key={author.id}
                      className="flex cursor-pointer items-center gap-3 text-[14px] text-[var(--home-muted)]"
                    >
                      <input
                        type="radio"
                        name="author"
                        checked={selectedAuthor === author.id}
                        onChange={() => {
                          setSelectedAuthor(author.id);
                          setPage(1);
                        }}
                        className="size-3 accent-[var(--home-green)]"
                      />
                      {author.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border border-[var(--home-border)] bg-white p-4">
                <h2 className="text-[18px] font-semibold text-[var(--home-green-deep)]">
                  Price Range
                </h2>
                <input
                  type="range"
                  min={0}
                  max={dynamicMaxPrice}
                  value={maxPrice}
                  onChange={(event) => {
                    maxPriceTouchedRef.current = true;
                    setMaxPrice(Number(event.target.value));
                    setPage(1);
                  }}
                  className="mt-5 w-full accent-[var(--home-gold)]"
                />
                <div className="mt-3 flex items-center justify-between text-[12px] text-[var(--home-muted)]">
                  <span>$0</span>
                  <span>${maxPrice}</span>
                </div>
              </div>

              <div className="border border-[var(--home-border)] bg-white p-4">
                <h2 className="text-[18px] font-semibold text-[var(--home-green-deep)]">
                  Format
                </h2>
                <div className="mt-4 space-y-3">
                  {formatFilters.map((format) => (
                    <label
                      key={format}
                      className="flex cursor-pointer items-center gap-3 text-[14px] text-[var(--home-muted)]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFormats.includes(format)}
                        onChange={() => {
                          setSelectedFormats((current) =>
                            current.includes(format)
                              ? current.filter((item) => item !== format)
                              : [...current, format],
                          );
                          setPage(1);
                        }}
                        className="size-3 accent-[var(--home-green)]"
                      />
                      {format}
                    </label>
                  ))}
                  {!formatFilters.length ? (
                    <p className="text-[14px] text-[var(--home-muted)]">
                      No formats available.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <CategoryProductCard key={product.slug} product={product} />
              ))}
              {booksQuery.isLoading ? (
                <p className="col-span-full border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
                  Loading books...
                </p>
              ) : null}
              {!booksQuery.isLoading && !visibleProducts.length ? (
                <p className="col-span-full border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
                  No approved books match these filters.
                </p>
              ) : null}
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-[14px] text-[var(--home-muted)]">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex size-10 items-center justify-center border border-[var(--home-border)] bg-white transition hover:border-[var(--home-gold)]"
              >
                ←
              </button>
              {paginationItems.map((item, index) =>
                typeof item === "number" ? (
                  <button
                    key={`${item}-${index}`}
                    type="button"
                    onClick={() => setPage(Math.min(item, pageCount))}
                    className={`inline-flex size-10 items-center justify-center border transition ${
                      currentPage === item
                        ? "border-[var(--home-green)] bg-[var(--home-green)] text-white"
                        : "border-[var(--home-border)] bg-white hover:border-[var(--home-gold)]"
                    }`}
                  >
                    {item}
                  </button>
                ) : (
                  <span
                    key={`${item}-${index}`}
                    className="inline-flex size-10 items-center justify-center"
                  >
                    ...
                  </span>
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
                className="inline-flex size-10 items-center justify-center border border-[var(--home-border)] bg-white transition hover:border-[var(--home-gold)]"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedBanner />

      <section className="px-5 py-14 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <h2 className="text-[38px] leading-10 font-semibold text-[var(--home-green-deep)] sm:text-[54px]">
            Meet Future Founding Authors
          </h2>
          <div className="mx-auto mt-5 h-1 w-12 bg-[var(--home-gold)]" />
        </div>
        <div className="mx-auto mt-12 grid max-w-[1440px] gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {(authorsQuery.data?.authors ?? []).map((author) => (
            <AuthorCard
              key={author.id}
              author={{
                href: `/authors/${author.id}`,
                name: author.profile
                  ? `${author.profile.firstName || ""} ${author.profile.lastName || ""}`.trim() ||
                    author.username
                  : author.username,
                badge: "Founding Author",
                books: String(author.bookCount),
                rating: "0.0",
                readers: "0",
                avatar: author.profile?.avatarUrl || "/placeholder-author.png",
              }}
            />
          ))}
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
