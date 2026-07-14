"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Star } from "lucide-react";

import {
  categoryFilterCounts,
  categoryFilters,
  categoryGridProducts,
  featuredCategoryTiles,
  formatFilters,
} from "@/data/catalog";
import {
  AuthorCard,
  FeaturedBanner,
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import {
  authors,
  footerColumns,
} from "@/features/website/homepage/api/homepage.data";
import { SiteHeader } from "@/components/shared/site/SiteHeader";
import { CategoryCard } from "./CategoryCard";
import { CategoryProductCard } from "./CategoryProductCard";

const pageSize = 12;

export function CategoryPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const queryCategory = searchParams.get("category");
  const queryFormat = searchParams.get("format");
  const showCategoryCards = view !== "shop";
  const activeNavHref =
    view === "shop" ? "/categories?view=shop" : "/categories?view=categories";

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<string[] | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [page, setPage] = useState(1);

  const defaultCategory = useMemo(
    () =>
      queryCategory && categoryFilters.includes(queryCategory)
        ? queryCategory
        : "All Categories",
    [queryCategory],
  );

  const defaultFormats = useMemo(
    () =>
      queryFormat && formatFilters.includes(queryFormat) ? [queryFormat] : [],
    [queryFormat],
  );

  const activeCategory = selectedCategory ?? defaultCategory;
  const activeFormats = selectedFormats ?? defaultFormats;

  const expandedProducts = useMemo(() => {
    return Array.from({ length: 12 }).flatMap((_, index) =>
      categoryGridProducts.map((product, productIndex) => ({
        ...product,
        slug: `${product.slug}-${index + 1}-${productIndex + 1}`,
      })),
    );
  }, []);

  const filteredProducts = useMemo(() => {
    return expandedProducts.filter((product) => {
      const numericPrice = Number(product.price.replace(/[^0-9.]/g, ""));

      const categoryMatch =
        activeCategory === "All Categories" ||
        product.filterCategory === activeCategory;

      const formatMatch =
        activeFormats.length === 0 ||
        activeFormats.some((format) =>
          product.formats.some(
            (productFormat) => productFormat.label === format,
          ),
        );

      const ratingMatch =
        selectedRating === 0 || product.rating >= selectedRating;
      const priceMatch = numericPrice <= maxPrice;

      return categoryMatch && formatMatch && ratingMatch && priceMatch;
    });
  }, [
    activeCategory,
    activeFormats,
    expandedProducts,
    maxPrice,
    selectedRating,
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

            <div className="mx-auto mt-12 grid max-w-[1440px] gap-8 lg:grid-cols-3">
              {featuredCategoryTiles.map((tile) => (
                <CategoryCard key={tile.title} tile={tile} />
              ))}
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
                          checked={activeCategory === category}
                          onChange={() => {
                            setSelectedCategory(category);
                            setPage(1);
                          }}
                          className="size-3 accent-[var(--home-green)]"
                        />
                        {category}
                      </span>
                      <span>
                        {categoryFilterCounts[
                          category as keyof typeof categoryFilterCounts
                        ] ?? ""}
                      </span>
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
                  max={100}
                  value={maxPrice}
                  onChange={(event) => {
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
                        checked={activeFormats.includes(format)}
                        onChange={() => {
                          setSelectedFormats((current) =>
                            (current ?? activeFormats).includes(format)
                              ? (current ?? defaultFormats).filter(
                                  (item) => item !== format,
                                )
                              : [...(current ?? defaultFormats), format],
                          );
                          setPage(1);
                        }}
                        className="size-3 accent-[var(--home-green)]"
                      />
                      {format}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border border-[var(--home-border)] bg-white p-4">
                <h2 className="text-[18px] font-semibold text-[var(--home-green-deep)]">
                  Rating
                </h2>
                <div className="mt-4 space-y-3">
                  {[4, 0].map((rating) => (
                    <label
                      key={rating}
                      className="flex cursor-pointer items-center gap-3 text-[14px] text-[var(--home-muted)]"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => {
                          setSelectedRating(rating);
                          setPage(1);
                        }}
                        className="size-3 accent-[var(--home-green)]"
                      />
                      <span className="flex items-center gap-1 text-[var(--home-gold)]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className="size-3 fill-transparent stroke-current"
                          />
                        ))}
                      </span>
                      <span>{rating === 0 ? "& Up" : "& Up"}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <CategoryProductCard key={product.slug} product={product} />
              ))}
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
          {authors.map((author, index) => (
            <AuthorCard key={`${author.name}-${index}`} author={author} />
          ))}
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
