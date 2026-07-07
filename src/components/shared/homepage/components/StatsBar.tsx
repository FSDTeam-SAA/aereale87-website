import { cn } from "@/lib/utils";
import type { StatItem } from "../homepage.data";

export function StatsBar({ items }: { items: StatItem[] }) {
  return (
    <div className="bg-[var(--home-green)] px-5 py-[30px] sm:px-8 lg:px-[200px]">
      <div className="mx-auto grid max-w-[1520px] gap-6 md:grid-cols-3 md:gap-8">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              "flex min-h-[65px] flex-col items-center justify-center gap-1 text-center",
              index !== items.length - 1 &&
                "md:border-r md:border-r-white/25 md:pr-8",
            )}
          >
            <span className="text-[32px] leading-8 text-[var(--home-gold)] sm:text-[36px]">
              {item.value}
            </span>
            <span className="text-[18px] leading-[1.2] text-[var(--home-surface)] sm:text-[24px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
