"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus, Star } from "lucide-react";

import type { Product } from "@/data/catalog";

export function ProductHero({ product }: { product: Product }) {
  const [formatId, setFormatId] = useState(
    product.formats[0]?.id ?? "hardcover",
  );
  const [quantity, setQuantity] = useState(1);

  const selectedFormat = useMemo(
    () =>
      product.formats.find((format) => format.id === formatId) ??
      product.formats[0],
    [formatId, product.formats],
  );

  return (
    <section className="px-5 py-10 sm:px-8 lg:px-[120px] lg:py-20">
      <div className="mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-[816px_816px]">
        <div className="border border-[var(--home-border)] bg-white p-[1px]">
          <div className="relative min-h-[520px] bg-[var(--home-paper)] lg:min-h-[798px]">
            <Image
              src={product.detailImage ?? product.cover}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 816px"
              className="object-cover"
            />
            <div className="absolute left-[17px] top-[17px] flex flex-col gap-2">
              {product.badge ? (
                <span className="inline-flex min-h-[27px] items-center bg-[var(--home-gold)] px-3 text-[12px] font-medium uppercase tracking-[0.6px] text-[var(--home-ink)]">
                  {product.badge}
                </span>
              ) : null}
              {product.secondaryBadge ? (
                <span className="inline-flex min-h-[27px] items-center bg-[var(--home-green)] px-3 text-[12px] font-medium uppercase tracking-[0.6px] text-white">
                  {product.secondaryBadge}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <p className="text-[16px] font-semibold uppercase tracking-[0.48px] text-[var(--home-gold)]">
            {product.category}
          </p>
          <h1 className="mt-6 text-[44px] leading-[1.15] font-bold text-[var(--home-green-deep)] lg:text-[60px]">
            {product.title}
          </h1>
          <p className="mt-5 text-[24px] leading-[1.2] text-[var(--home-muted)]">
            By{" "}
            <span className="font-semibold text-[var(--home-green-deep)]">
              {product.author}
            </span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[16px] text-[var(--home-muted)]">
            <div className="flex items-center gap-1 text-[var(--home-gold)]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-4 fill-transparent stroke-current"
                />
              ))}
            </div>
            <span>{product.rating.toFixed(1)}</span>
            <span className="underline">({product.reviewCount} Reviews)</span>
          </div>
          <p className="mt-8 text-[40px] font-bold leading-[1.2] text-[var(--home-green)]">
            {selectedFormat.price}
          </p>
          <p className="mt-8 max-w-[816px] text-[18px] leading-[1.35] text-[var(--home-muted)] lg:text-[20px]">
            {product.shortDescription}
          </p>

          <div className="mt-10">
            <h2 className="text-[24px] font-semibold uppercase tracking-[0.6px] text-[var(--home-green-deep)]">
              Select Format
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {product.formats.map((format, index) => (
                <button
                  key={format.id}
                  type="button"
                  onClick={() => setFormatId(format.id)}
                  className={`relative border px-4 py-4 text-left transition ${
                    format.id === formatId
                      ? "border-[var(--home-gold)] bg-[var(--home-paper)]"
                      : "border-[var(--home-border)] bg-white hover:border-[var(--home-gold)]"
                  }`}
                >
                  {index === product.formats.length - 1 ? (
                    <span className="absolute right-0 top-0 h-4 w-4 bg-[linear-gradient(135deg,var(--home-gold)_50%,transparent_50%)]" />
                  ) : null}
                  <div className="text-[14px] font-semibold text-[var(--home-green-deep)]">
                    {format.label}
                  </div>
                  <div className="mt-1 text-[14px] text-[var(--home-muted)]">
                    {format.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="inline-flex h-[58px] items-center border border-[var(--home-border)]">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                className="inline-flex h-full w-12 items-center justify-center text-[var(--home-muted)] transition hover:text-[var(--home-green-deep)]"
              >
                <Minus className="size-4" />
              </button>
              <span className="inline-flex h-full min-w-12 items-center justify-center text-[16px] text-[var(--home-green-deep)]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="inline-flex h-full w-12 items-center justify-center text-[var(--home-muted)] transition hover:text-[var(--home-green-deep)]"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button className="inline-flex h-[58px] min-w-[196px] items-center justify-center bg-[var(--home-gold)] px-8 text-[16px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)] [font-family:var(--font-display)]">
              Buy Now
            </button>
            <button className="inline-flex h-[58px] min-w-[196px] items-center justify-center border border-[var(--home-gold)] bg-white px-8 text-[16px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)]">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
