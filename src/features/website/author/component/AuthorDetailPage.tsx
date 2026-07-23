import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";
import { SiteHeader } from "@/components/shared/site/SiteHeader";
import type { AuthorPageData } from "@/data/catalog";

import { AuthorBookShelfSection } from "./AuthorBookShelfSection";
import { AuthorHeroSection } from "./AuthorHeroSection";

export function AuthorDetailPage({ author }: { author: AuthorPageData }) {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/authors" />
      <AuthorHeroSection author={author} />
      <AuthorBookShelfSection
        shelf={author.shelves[0]}
        className="bg-[var(--home-paper)]"
      />
      <AuthorBookShelfSection shelf={author.shelves[1]} className="bg-white" />
      <AuthorBookShelfSection
        shelf={author.shelves[2]}
        className="bg-white pt-8 lg:pt-10"
      />
      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
