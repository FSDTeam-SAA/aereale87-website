import Link from "next/link";

import { SiteHeader } from "@/components/shared/site/SiteHeader";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";

export default function AuthorTermsPage() {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/authors" />

      <section className="bg-[var(--home-paper)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[var(--home-gold)]">
            Author Terms
          </p>
          <h1 className="mt-4 text-[40px] font-bold leading-[1.1] sm:text-[52px]">
            Founding Author Terms
          </h1>
          <div className="mt-8 space-y-5 border border-[var(--home-border)] bg-white p-8 text-[16px] leading-7 text-[var(--home-muted)]">
            <p>
              This page is reserved for the Wonder Emporium author program terms
              and publishing conditions.
            </p>
            <p>
              The current website does not yet load a live terms endpoint here,
              so this route is available as a stable destination while the
              content contract is finalized.
            </p>
            <p>
              For immediate questions about onboarding, payouts, or publishing
              workflow, continue to the authors area or contact the platform
              team.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/authors"
              className="inline-flex h-12 items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
            >
              Back to Authors
            </Link>
            <Link
              href="/categories?view=shop"
              className="inline-flex h-12 items-center justify-center border border-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
