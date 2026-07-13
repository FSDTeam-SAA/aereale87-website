import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { Product } from "@/data/catalog";

export function AuthorBookCard({ product }: { product: Product }) {
  return (
    <article className="border border-[var(--home-border)] bg-white p-3 shadow-[0_6px_24px_rgba(27,46,36,0.05)]">
      <Link
        href={`/products/${product.slug}`}
        className="group block overflow-hidden bg-[var(--home-paper)]"
      >
        <Image
          src={product.cover}
          alt={product.title}
          width={288}
          height={320}
          className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="mt-3">
        <div className="flex items-center gap-1 text-[var(--home-gold)]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="size-3 fill-transparent stroke-current"
            />
          ))}
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="mt-2 block text-[20px] font-semibold leading-[1.2] text-[var(--home-green-deep)] transition hover:text-[var(--home-green)]"
        >
          {product.title}
        </Link>

        <p className="mt-1 text-[12px] leading-[1.2] text-[var(--home-muted)]">
          {product.author}
        </p>

        <p className="mt-3 text-[24px] font-bold leading-none text-[var(--home-green)]">
          {product.price}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-4 inline-flex h-[42px] w-full items-center justify-center bg-[var(--home-gold)] px-4 text-[11px] font-bold uppercase tracking-[0.6px] text-white transition hover:bg-[var(--home-green)] [font-family:var(--font-display)]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
