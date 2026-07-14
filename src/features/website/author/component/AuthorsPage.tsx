import {
  AuthorCard,
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import {
  authors,
  footerColumns,
} from "@/features/website/homepage/api/homepage.data";
import { SiteHeader } from "@/components/shared/site/SiteHeader";

export function AuthorsPage() {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/authors" />

      <section className="bg-[var(--home-paper)] px-5 py-16 text-center sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[980px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[var(--home-gold)]">
            Author Community
          </p>
          <h1 className="mt-4 text-balance text-[42px] font-bold leading-[1.12] text-[var(--home-green-deep)] sm:text-[54px]">
            Meet Future Founding Authors
          </h1>
          <p className="mx-auto mt-5 max-w-[760px] text-[18px] leading-[1.5] text-[var(--home-muted)] sm:text-[22px]">
            Discover the writers shaping The Wonder Emporium with meaningful
            stories, practical wisdom, and reader-first publishing.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {authors.map((author, index) => (
              <AuthorCard key={`${author.name}-${index}`} author={author} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--home-paper)] px-5 py-14 text-center sm:px-8 lg:px-[120px] lg:py-16">
        <div className="mx-auto max-w-[980px]">
          <h2 className="text-[34px] font-bold leading-[1.15] sm:text-[44px]">
            Publish With The Wonder Emporium
          </h2>
          <p className="mx-auto mt-4 max-w-[720px] text-[17px] leading-[1.5] text-[var(--home-muted)] sm:text-[20px]">
            Our founding author program helps writers publish books, audiobooks,
            build premium profiles, and reach readers who care about craft.
          </p>
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
