"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, TabletSmartphone } from "lucide-react";

import type { CategoryTile } from "@/data/catalog";

const iconMap = {
  spark: Sparkles,
  star: Star,
  tablet: TabletSmartphone,
};

export function CategoryCard({ tile }: { tile: CategoryTile }) {
  const Icon = iconMap[tile.icon];

  if (tile.image) {
    return (
      <Link
        href={tile.href}
        className="group relative block min-h-[240px] overflow-hidden border border-[rgba(232,224,204,0.8)] lg:min-h-[320px]"
      >
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/62 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <h2 className="text-[24px] leading-8">{tile.title}</h2>
          <div className="mt-2 inline-flex items-center gap-2 text-[16px] leading-[1.2]">
            <span>{tile.subtitle}</span>
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={tile.href}
      className={`group flex min-h-[240px] flex-col items-center justify-center border border-[rgba(232,224,204,0.8)] px-6 text-center transition ${
        tile.emphasized
          ? "bg-[var(--home-green)] text-white"
          : "bg-white text-[var(--home-ink)] hover:bg-[var(--home-surface)]"
      } lg:min-h-[320px]`}
    >
      <Icon
        className={`mb-6 size-8 ${tile.emphasized ? "text-white" : "text-[var(--home-gold)]"}`}
      />
      <h2 className="text-[24px] leading-[1.2]">{tile.title}</h2>
      <p
        className={`mt-3 text-[16px] leading-[1.2] ${
          tile.emphasized ? "text-white/75" : "text-[var(--home-muted)]"
        }`}
      >
        {tile.subtitle}
      </p>
    </Link>
  );
}
