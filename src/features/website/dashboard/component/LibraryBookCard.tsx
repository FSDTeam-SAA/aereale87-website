import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { LibraryBook } from "../types/dashboard.types";

export function LibraryBookCard({ book }: { book: LibraryBook }) {
  return (
    <article className="border border-[var(--home-border)] bg-white p-5">
      <Link
        href={`/products/${book.slug}`}
        className="relative mx-auto block aspect-[0.72] w-full max-w-[190px] overflow-hidden bg-[var(--home-paper)] shadow-[0_12px_18px_rgba(27,46,36,0.16)]"
      >
        <Image
          src={book.cover}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 50vw, 190px"
          className="object-cover"
        />
      </Link>
      <div className="mt-6 flex gap-0.5 text-[var(--home-gold)]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`size-3.5 ${
              index < book.rating ? "fill-current" : "fill-transparent"
            }`}
          />
        ))}
      </div>
      <Link
        href={`/products/${book.slug}`}
        className="mt-2 block text-[20px] font-bold leading-[1.15] text-[var(--home-green)] transition hover:text-[var(--home-green-deep)]"
      >
        {book.title}
      </Link>
      <p className="mt-1 text-[14px] text-[var(--home-muted)]">{book.author}</p>
    </article>
  );
}
