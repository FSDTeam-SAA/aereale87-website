import Image from "next/image";
import { BookOpen, Headphones, Megaphone, Sparkles } from "lucide-react";

import { HomeCta, HomeSection } from "./primitives";

export function FoundingProgram({ benefits }: { benefits: string[] }) {
  const icons = [BookOpen, Headphones, Sparkles, Megaphone];

  return (
    <HomeSection className="bg-[var(--home-surface)]">
      <div className="grid gap-10 lg:grid-cols-[816px_minmax(0,816px)] lg:items-center lg:gap-12">
        <div className="relative min-h-[620px] overflow-hidden">
          <Image
            src="/home/founding-author.png"
            alt="Luxury desk scene for founding author program"
            fill
            sizes="(max-width: 1024px) 100vw, 816px"
            className="object-cover"
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-[32px] font-bold text-[var(--home-green-deep)] sm:text-[40px]">
            Become A Founding Author
          </h2>
          <p className="text-[20px] text-[var(--home-muted)] sm:text-[20px]">
            Join the first 100 authors and help shape the future of The Wonder
            Emporium. Elevate your storytelling to a premium audience.
          </p>
          <ul className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = icons[index];

              return (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--home-paper)] text-[var(--home-green-deep)]">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-[24px] text-[var(--home-green-deep)] sm:text-[24px]">
                    {benefit}
                  </span>
                </li>
              );
            })}
          </ul>
          <HomeCta href="#authors" invert className="w-full sm:w-[264px]">
            Apply As An Author
          </HomeCta>
        </div>
      </div>
    </HomeSection>
  );
}
