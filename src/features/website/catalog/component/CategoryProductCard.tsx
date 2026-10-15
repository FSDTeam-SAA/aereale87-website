import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { AddToCartButton } from "@/features/website/cart/component/AddToCartButton";
import type { Product } from "@/data/catalog";

export function CategoryProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col border border-[var(--home-border)] bg-white p-4 shadow-[0_6px_20px_rgba(27,46,36,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <Link
        href={`/book/${product.slug}`}
        className="group relative mb-4 block h-[320px] w-full overflow-hidden bg-[var(--home-paper)]"
      >
        <Image
          src={product.cover}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        {product.badge ? (
          <span className="absolute left-2 top-2 inline-flex min-h-6 items-center bg-[var(--home-gold)] px-2 text-[12px] uppercase tracking-[0.6px] text-[var(--home-ink)]">
            {product.badge}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-1 text-[var(--home-gold)]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-3.5 fill-transparent stroke-current"
              />
            ))}
            <span className="ml-1 text-[12px] text-[var(--home-muted)]">
              ({product.reviewCount})
            </span>
          </div>
          <div>
            <Link
              href={`/book/${product.slug}`}
              className="line-clamp-2 min-h-[2.4em] text-[20px] font-bold leading-[1.2] text-[var(--home-green-deep)] transition hover:text-[var(--home-green)]"
            >
              {product.title}
            </Link>
            <p className="mt-1 line-clamp-1 text-[15px] leading-[1.2] text-[var(--home-muted)]">
              {product.author}
            </p>
          </div>
        </div>
        <div className="mt-auto space-y-3 pt-2">
          <p className="text-[22px] font-bold leading-[1.2] text-[var(--home-green)]">
            {product.price}
          </p>
          <AddToCartButton
            bookId={product.slug}
            formatId={product.formats[0]?.id}
            className="inline-flex h-[52px] w-full items-center justify-center border border-[var(--home-gold)] bg-transparent text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 [font-family:var(--font-display)]"
          />
        </div>
      </div>
    </article>
  );
}
