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
  const shelves = author.shelves.filter(
    (shelf) => shelf && shelf.products?.length,
  );

  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/authors" />
      <AuthorHeroSection author={author} />
      {shelves.map((shelf, index) => (
        <AuthorBookShelfSection
          key={`${shelf.title}-${index}`}
          shelf={shelf}
          className={
            index === 0 ? "bg-[var(--home-paper)]" : "bg-white pt-8 lg:pt-10"
          }
        />
      ))}
      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
