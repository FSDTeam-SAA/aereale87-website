import {
  FoundingProgram,
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import {
  footerColumns,
  foundingBenefits,
} from "@/features/website/homepage/api/homepage.data";
import { SiteHeader } from "@/components/shared/site/SiteHeader";
import type { Product } from "@/data/catalog";

import { ProductHero } from "./ProductHero";
import {
  AboutBookSection,
  AuthorSpotlightSection,
  RecommendationsSection,
  ReviewsSection,
  SpecificationsSection,
} from "./ProductSections";

export function ProductDetailPage({
  product,
  recommendations,
}: {
  product: Product;
  recommendations?: Product[];
}) {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader />
      <ProductHero product={product} />
      <AboutBookSection product={product} />
      <SpecificationsSection product={product} />
      <AuthorSpotlightSection product={product} />
      <ReviewsSection product={product} />
      <RecommendationsSection products={recommendations} />
      <FoundingProgram benefits={foundingBenefits} />
      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
