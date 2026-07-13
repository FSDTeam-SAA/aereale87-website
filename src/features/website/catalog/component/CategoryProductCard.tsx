import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { Product } from "@/data/catalog";

export function CategoryProductCard({ product }: { product: Product }) {
  return (
    <article className="border border-[var(--home-border)] bg-white p-4 shadow-[0_6px_20px_rgba(27,46,36,0.04)]">
      <Link
        href={`/products/${product.slug}`}
        className="group relative mb-4 block overflow-hidden bg-[var(--home-paper)]"
      >
        <Image
          src={product.cover}
          alt={product.title}
          width={288}
          height={375}
          className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        {product.badge ? (
          <span className="absolute left-2 top-2 inline-flex min-h-6 items-center bg-[var(--home-gold)] px-2 text-[12px] uppercase tracking-[0.6px] text-[var(--home-ink)]">
            {product.badge}
          </span>
        ) : null}
      </Link>
      <div className="space-y-4">
        <div className="flex items-center gap-1 text-[var(--home-gold)]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="size-3 fill-transparent stroke-current"
            />
          ))}
          <span className="ml-1 text-[12px] text-[var(--home-muted)]">
            ({product.reviewCount})
          </span>
        </div>
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="line-clamp-2 text-[24px] leading-[1.2] text-[var(--home-green-deep)] transition hover:text-[var(--home-green)]"
          >
            {product.title}
          </Link>
          <p className="mt-2 text-[16px] leading-[1.2] text-[var(--home-muted)]">
            {product.author}
          </p>
        </div>
        <p className="text-[24px] font-bold leading-[1.2] text-[var(--home-green)]">
          {product.price}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex h-[58px] w-full items-center justify-center border border-[var(--home-gold)] bg-transparent text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)]"
        >
          Add To Cart
        </Link>
      </div>
    </article>
  );
}
