import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { BookItem } from "../types/homepage.types";
import { HomeCta } from "./primitives";

export function BookCard({ book }: { book: BookItem }) {
  return (
    <article className="flex h-full flex-col border border-[var(--home-border)] bg-white p-4 shadow-[0_4px_18px_rgba(27,46,36,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <Link
        href={book.href}
        className="group relative mb-2 block h-[320px] overflow-hidden bg-[var(--home-paper)]"
      >
        <Image
          src={book.image}
          alt={book.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        {book.badge ? (
          <span className="absolute left-2 top-2 inline-flex min-h-6 items-center bg-[var(--home-gold)] px-2 text-[12px] uppercase tracking-[0.6px] text-[var(--home-ink)]">
            {book.badge}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-4 px-1 pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[var(--home-gold)]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-3.5 fill-transparent stroke-current"
              />
            ))}
            {book.reviews ? (
              <span className="ml-1 text-[12px] text-[var(--home-muted)]">
                {book.reviews}
              </span>
            ) : null}
          </div>
          <Link
            href={book.href}
            className="block text-[24px] font-bold leading-[1.2] text-[var(--home-green-deep)] transition hover:text-[var(--home-green)]"
          >
            {book.title}
          </Link>
          <p className="text-[16px] leading-[1.2] text-[var(--home-muted)]">
            {book.author}
          </p>
        </div>
        <div className="mt-auto space-y-4">
          <p className="text-[24px] font-bold leading-[1.2] text-[var(--home-green)]">
            {book.price}
          </p>
          <HomeCta
            href={book.href}
            className="flex w-full text-center text-[var(--home-gold)] hover:text-white"
            invert={false}
          >
            Add To Cart
          </HomeCta>
        </div>
      </div>
    </article>
  );
}
