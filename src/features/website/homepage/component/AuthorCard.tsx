import Image from "next/image";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AuthorItem } from "../types/homepage.types";

export function AuthorCard({ author }: { author: AuthorItem }) {
  const badgeMuted = author.badge === "Rising Author";

  return (
    <article className="border border-[var(--home-border)] bg-white px-6 py-6 sm:px-8">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <Image
            src={author.avatar}
            alt={`${author.name} portrait`}
            width={80}
            height={80}
            className="size-20 rounded-full object-cover"
            loading="lazy"
          />
          <span className="absolute -bottom-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-[var(--home-gold)] text-[var(--home-ink)]">
            <Star className="size-3 fill-current stroke-[var(--home-ink)]" />
          </span>
        </div>
        <h3 className="text-center text-[24px] font-bold leading-[1.2] text-[#121a10]">
          {author.name}
        </h3>
        <span
          className={cn(
            "mt-2 inline-flex items-center gap-1 px-2 py-1 text-[12px] leading-none",
            badgeMuted
              ? "bg-[#e3e5e0] text-[#47534b]"
              : "bg-[rgba(207,175,69,0.16)] text-[#a27415]",
          )}
        >
          <Star className="size-3 stroke-current" />
          {author.badge}
        </span>
      </div>
      <dl className="mt-6 grid grid-cols-3 text-center">
        <div>
          <dd className="mb-1 text-[20px] font-bold leading-5 text-[#121a10]">
            {author.books}
          </dd>
          <dt className="text-[16px] leading-[1.2] text-[#6f756d]">Books</dt>
        </div>
        <div className="border-x border-[rgba(232,224,204,0.9)]">
          <dd className="mb-1 text-[20px] font-bold leading-5 text-[#121a10]">
            {author.rating}
          </dd>
          <dt className="text-[16px] leading-[1.2] text-[#6f756d]">Rating</dt>
        </div>
        <div>
          <dd className="mb-1 text-[20px] font-bold leading-5 text-[#121a10]">
            {author.readers}
          </dd>
          <dt className="text-[16px] leading-[1.2] text-[#6f756d]">Readers</dt>
        </div>
      </dl>
    </article>
  );
}
