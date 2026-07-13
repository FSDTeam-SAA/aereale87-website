import Image from "next/image";

import type { AuthorPageData } from "@/data/catalog";

export function AuthorHeroSection({ author }: { author: AuthorPageData }) {
  return (
    <section className="relative overflow-hidden bg-[var(--home-surface)] px-5 pb-20 pt-10 sm:px-8 lg:px-[120px] lg:pb-24 lg:pt-16">
      <div className="absolute -left-16 top-[280px] size-[160px] rounded-tr-[100px] bg-[rgba(232,224,204,0.7)] sm:size-[220px]" />
      <div className="absolute -right-10 top-0 size-[120px] rounded-bl-[80px] bg-[rgba(232,224,204,0.7)] sm:size-[180px]" />
      <div className="absolute bottom-0 left-[8%] hidden size-[120px] -translate-y-1/2 rounded-tr-[80px] bg-[rgba(232,224,204,0.5)] lg:block" />

      <div className="relative mx-auto flex max-w-[1440px] justify-center">
        <div className="w-full max-w-[1056px] text-center">
          <div className="mx-auto w-full max-w-[358px] border border-[rgba(27,46,36,0.08)] bg-white p-1.5 shadow-[0_12px_30px_rgba(27,46,36,0.08)]">
            <Image
              src={author.image}
              alt={author.name}
              width={350}
              height={350}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[1px] text-[var(--home-gold)]">
            About The Author
          </p>
          <h1 className="mt-2 text-[34px] font-bold leading-[1.15] text-[var(--home-green)] sm:text-[44px]">
            {author.name}
          </h1>
          <p className="mx-auto mt-5 max-w-[1040px] text-[16px] leading-[1.55] text-[var(--home-muted)] sm:text-[18px]">
            {author.bio}
          </p>

          <dl className="mx-auto mt-10 grid max-w-[664px] gap-6 border-[rgba(27,46,36,0.08)] sm:grid-cols-3 sm:gap-8">
            <div>
              <dd className="text-[36px] font-bold leading-none text-[var(--home-green)]">
                {author.books}
              </dd>
              <dt className="mt-2 text-[12px] uppercase tracking-[2px] text-[var(--home-muted)]">
                Published Books
              </dt>
            </div>
            <div className="sm:border-x sm:border-[rgba(27,46,36,0.08)] sm:px-8">
              <dd className="text-[36px] font-bold leading-none text-[var(--home-green)]">
                {author.rating}
              </dd>
              <dt className="mt-2 text-[12px] uppercase tracking-[2px] text-[var(--home-muted)]">
                Average Rating
              </dt>
            </div>
            <div>
              <dd className="text-[36px] font-bold leading-none text-[var(--home-green)]">
                {author.readers}
              </dd>
              <dt className="mt-2 text-[12px] uppercase tracking-[2px] text-[var(--home-muted)]">
                Readers
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
