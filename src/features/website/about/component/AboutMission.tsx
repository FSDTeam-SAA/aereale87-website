import { missionItems } from "../api/about.data";

export function AboutMission() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:px-[120px] lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-center text-[34px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[42px]">
          Our Mission
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {missionItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="border border-[var(--home-border)] bg-[var(--home-surface)] p-7 shadow-[0_4px_18px_rgba(27,46,36,0.03)]"
              >
                <span className="inline-flex size-9 items-center justify-center border border-[var(--home-border)] bg-white text-[var(--home-green-deep)]">
                  <Icon className="size-4" />
                </span>
                <h3 className="mt-5 text-[18px] font-bold leading-[1.25] text-[var(--home-green-deep)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-[var(--home-muted)] sm:text-[15px]">
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
