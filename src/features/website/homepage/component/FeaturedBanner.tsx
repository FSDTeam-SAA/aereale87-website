import Image from "next/image";

import { HomeCta } from "./primitives";

export function FeaturedBanner() {
  return (
    <section className="relative overflow-hidden bg-[var(--home-green-deep)] px-5 py-16 text-center sm:px-8 lg:px-[272px] lg:py-24">
      <div className="absolute inset-0">
        <Image
          src="/home/masters-library.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[rgba(27,46,36,0.24)]" />
      <div className="relative mx-auto flex max-w-[1376px] flex-col items-center gap-6">
        <p className="text-[18px] font-bold uppercase tracking-[0.72px] text-[var(--home-gold)] sm:text-[20px]">
          Exclusive Series
        </p>
        <h2 className="text-balance text-[42px] leading-[1.1] font-bold text-white sm:text-[56px] lg:text-[72px]">
          The Master&apos;s Library
        </h2>
        <p className="max-w-[1120px] text-pretty text-[20px] leading-[1.2] text-white/80 sm:text-[24px]">
          A curated collection of timeless books on leadership, wisdom, personal
          growth, and transformation. Bound in premium materials for the
          discerning reader.
        </p>
        <HomeCta href="#shop" invert className="min-w-[198px]">
          Shop Collection
        </HomeCta>
      </div>
    </section>
  );
}
