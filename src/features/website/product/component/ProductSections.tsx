import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Globe2,
  Hash,
  Layers3,
  Ruler,
  Scale,
  Star,
} from "lucide-react";

import { getAuthorSlug, recommendedProducts } from "@/data/catalog";
import type { Product } from "@/data/catalog";

const specIcons = [
  BookOpen,
  Globe2,
  Layers3,
  Hash,
  CalendarDays,
  Scale,
  Ruler,
  BadgeCheck,
];

export function AboutBookSection({ product }: { product: Product }) {
  return (
    <section className="bg-[var(--home-paper)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
      <div className="mx-auto max-w-[1680px] text-center">
        <h2 className="text-[42px] font-bold leading-[1.2] text-[var(--home-green-deep)]">
          About This Book
        </h2>
        <p className="mx-auto mt-8 max-w-[1320px] text-[20px] italic leading-[1.35] text-[var(--home-green-deep)] lg:text-[24px]">
          {product.aboutQuote}
        </p>
        <p className="mx-auto mt-8 max-w-[1320px] text-[16px] leading-[1.5] text-[var(--home-muted)] lg:text-[18px]">
          {product.aboutBody}
        </p>
      </div>
    </section>
  );
}

export function SpecificationsSection({ product }: { product: Product }) {
  return (
    <section className="bg-[var(--home-surface)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
      <div className="mx-auto max-w-[1680px]">
        <h2 className="text-center text-[42px] font-bold leading-[1.2] text-[var(--home-green-deep)]">
          Book Specifications
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {product.specs.map((spec, index) => {
            const Icon = specIcons[index];

            return (
              <div
                key={spec.label}
                className="border border-[var(--home-border)] bg-white px-8 py-7 text-center"
              >
                <Icon className="mx-auto size-5 text-[var(--home-gold)]" />
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.55px] text-[var(--home-muted)]">
                  {spec.label}
                </p>
                <p className="mt-2 text-[16px] font-semibold text-[var(--home-green-deep)]">
                  {spec.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AuthorSpotlightSection({ product }: { product: Product }) {
  const profile = product.authorProfile;

  return (
    <section className="bg-[var(--home-paper)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
      <div className="mx-auto max-w-[1680px] overflow-hidden bg-white px-8 py-8 shadow-[0_10px_25px_rgba(27,46,36,0.05)] lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[248px_1fr_200px] lg:items-center">
          <Image
            src={profile.image}
            alt={profile.name}
            width={248}
            height={248}
            className="h-auto w-full max-w-[248px] object-cover"
          />
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.72px] text-[var(--home-gold)]">
              Author Profile
            </p>
            <h2 className="mt-2 text-[40px] font-bold leading-[1.2] text-[var(--home-green)]">
              {profile.name}
            </h2>
            <p className="mt-4 max-w-[760px] text-[16px] leading-[1.5] text-[var(--home-muted)] lg:text-[18px]">
              {profile.bio}
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <dd className="text-[36px] font-bold leading-none text-[var(--home-green)]">
                  {profile.books}
                </dd>
                <dt className="mt-2 text-[12px] uppercase tracking-[0.55px] text-[var(--home-muted)]">
                  Published Books
                </dt>
              </div>
              <div>
                <dd className="text-[36px] font-bold leading-none text-[var(--home-green)]">
                  {profile.rating}
                </dd>
                <dt className="mt-2 text-[12px] uppercase tracking-[0.55px] text-[var(--home-muted)]">
                  Average Rating
                </dt>
              </div>
              <div>
                <dd className="text-[36px] font-bold leading-none text-[var(--home-green)]">
                  {profile.readers}
                </dd>
                <dt className="mt-2 text-[12px] uppercase tracking-[0.55px] text-[var(--home-muted)]">
                  Readers
                </dt>
              </div>
            </dl>
          </div>
          <div className="flex lg:justify-end">
            <Link
              href={`/authors/${getAuthorSlug(profile.name)}`}
              className="inline-flex h-[58px] items-center justify-center bg-[var(--home-gold)] px-8 text-[14px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)] [font-family:var(--font-display)]"
            >
              View Author Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection({ product }: { product: Product }) {
  const distribution = [
    ["5 Star", 105],
    ["4 Star", 12],
    ["3 Star", 5],
    ["2 Star", 2],
    ["1 Star", 0],
  ] as const;

  return (
    <section className="bg-[var(--home-surface)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
      <div className="mx-auto max-w-[1680px]">
        <h2 className="text-center text-[42px] font-bold leading-[1.2] text-[var(--home-green-deep)]">
          Customer Reviews
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="border border-[var(--home-border)] bg-white p-8 text-center">
            <p className="text-[56px] font-bold leading-none text-[var(--home-green)]">
              {product.rating.toFixed(1)}
            </p>
            <div className="mt-4 flex justify-center gap-1 text-[var(--home-gold)]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-4 fill-transparent stroke-current"
                />
              ))}
            </div>
            <p className="mt-4 text-[16px] text-[var(--home-muted)]">
              Based on {product.reviewCount} Reviews
            </p>

            <div className="mt-8 space-y-3 text-left">
              {distribution.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[48px_1fr_32px] items-center gap-3 text-[12px] text-[var(--home-muted)]"
                >
                  <span>{label}</span>
                  <div className="h-1.5 bg-[var(--home-paper)]">
                    <div
                      className="h-full bg-[var(--home-gold)]"
                      style={{ width: `${(value / 105) * 100}%` }}
                    />
                  </div>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 inline-flex h-[46px] w-full items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)] [font-family:var(--font-display)]">
              Write A Review
            </button>
          </div>

          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="border border-[var(--home-border)] bg-white p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--home-paper)] text-[var(--home-green-deep)]">
                      {review.initials}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-semibold text-[var(--home-green-deep)]">
                        {review.name}
                      </h3>
                      <p className="text-[12px] text-[var(--home-muted)]">
                        {review.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex justify-end gap-1 text-[var(--home-gold)]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="size-3.5 fill-transparent stroke-current"
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-[12px] text-[var(--home-muted)]">
                      {review.date}
                    </p>
                  </div>
                </div>
                <h4 className="mt-6 text-[24px] font-semibold text-[var(--home-green-deep)]">
                  {review.title}
                </h4>
                <p className="mt-4 text-[16px] leading-[1.5] text-[var(--home-muted)]">
                  {review.body}
                </p>
              </article>
            ))}

            <button className="inline-flex h-[46px] items-center justify-center border border-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)]">
              Load More Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RecommendationsSection() {
  return (
    <section className="bg-[var(--home-paper)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-[42px] font-bold leading-[1.2] text-[var(--home-green)]">
            You May Also Like
          </h2>
          <Link
            href="/categories"
            className="inline-flex h-[58px] w-full items-center justify-center border border-[var(--home-gold)] px-8 text-[14px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white [font-family:var(--font-display)] sm:w-[151px]"
          >
            View All
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {recommendedProducts.map((product) => (
            <article
              key={product.slug}
              className="border border-[var(--home-border)] bg-white p-4"
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <Image
                  src={product.cover}
                  alt={product.title}
                  width={360}
                  height={320}
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="mt-4 space-y-3">
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
                  className="block text-[24px] leading-[1.2] text-[var(--home-green-deep)] transition hover:text-[var(--home-green)]"
                >
                  {product.title}
                </Link>
                <p className="text-[16px] text-[var(--home-muted)]">
                  {product.author}
                </p>
                <p className="text-[24px] font-bold text-[var(--home-green)]">
                  {product.price}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex h-[46px] w-full items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)] [font-family:var(--font-display)]"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
