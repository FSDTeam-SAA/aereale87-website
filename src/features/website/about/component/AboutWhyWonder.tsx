import { whyWonderItems } from "../api/about.data";

export function AboutWhyWonder() {
  return (
    <section className="bg-[var(--home-surface)] px-5 py-14 sm:px-8 lg:px-[120px] lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-center text-[34px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[42px]">
          Why The Wonder Emporium?
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {whyWonderItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="border border-[var(--home-border)] bg-white p-6"
              >
                <span className="inline-flex size-8 items-center justify-center bg-[var(--home-paper)] text-[var(--home-green-deep)]">
                  <Icon className="size-4" />
                </span>
                <h3 className="mt-4 text-[17px] font-bold leading-[1.25] text-[var(--home-green-deep)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-[var(--home-muted)]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
