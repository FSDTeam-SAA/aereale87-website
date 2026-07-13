import { SiteHeader } from "@/components/shared/site/SiteHeader";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";

import { AboutEcosystem } from "./AboutEcosystem";
import { AboutHero } from "./AboutHero";
import { AboutMission } from "./AboutMission";
import { AboutStory } from "./AboutStory";
import { AboutWhyWonder } from "./AboutWhyWonder";

export function AboutPage() {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/about" />
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutWhyWonder />
      <AboutEcosystem />
      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
