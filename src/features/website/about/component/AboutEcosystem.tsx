import { ArrowRight } from "lucide-react";

import { ecosystemItems } from "../api/about.data";

export function AboutEcosystem() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-[120px] lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-center text-[34px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[42px]">
          The Wonder Ecosystem
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ecosystemItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="relative">
                <article className="h-full border border-[var(--home-border)] bg-[var(--home-surface)] p-6">
                  <Icon className="size-6 text-[var(--home-green-deep)]" />
                  <h3 className="mt-4 text-[18px] font-bold leading-[1.2] text-[var(--home-green-deep)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-[var(--home-muted)]">
                    {item.description}
                  </p>
                </article>
                {index < ecosystemItems.length - 1 ? (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden size-4 -translate-y-1/2 text-[var(--home-muted)] xl:block" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
