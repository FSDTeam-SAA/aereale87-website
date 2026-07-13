import { dashboardStats } from "../api/dashboard.data";

export function StatsGrid() {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      {dashboardStats.map((stat) => {
        const Icon = stat.icon;
        const toneClass =
          stat.tone === "blue"
            ? "bg-indigo-50 text-indigo-600"
            : "bg-orange-50 text-orange-600";

        return (
          <article
            key={stat.label}
            className="border border-[var(--home-border)] bg-white p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className={`inline-flex size-9 items-center justify-center ${toneClass}`}
              >
                <Icon className="size-4" />
              </span>
              <span
                className={`rounded-sm px-2 py-1 text-[11px] font-semibold ${toneClass}`}
              >
                {stat.badge}
              </span>
            </div>
            <p className="mt-8 text-[14px] text-[var(--home-muted)]">
              {stat.label}
            </p>
            <p className="mt-1 text-[28px] font-bold leading-none">
              {stat.value}
            </p>
          </article>
        );
      })}
    </section>
  );
}
