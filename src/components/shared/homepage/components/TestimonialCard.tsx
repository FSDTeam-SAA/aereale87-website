import Image from "next/image";
import { Star } from "lucide-react";

import type { TestimonialItem } from "../homepage.data";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialItem;
}) {
  return (
    <article className="flex h-full flex-col border border-[var(--home-border)] bg-white px-7 py-7">
      <div className="mb-4 flex items-center gap-1 text-[var(--home-gold)]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-transparent stroke-current"
          />
        ))}
      </div>
      <p className="min-h-[96px] text-[16px] leading-[1.2] text-[#7a8797]">
        {testimonial.quote}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <Image
          src={testimonial.avatar}
          alt={`${testimonial.name} avatar`}
          width={48}
          height={48}
          className="size-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h3 className="text-[18px] font-bold leading-[1.2] text-[#1c2740]">
            {testimonial.name}
          </h3>
          <p className="text-[12px] leading-[1.2] text-[#7a8797]">
            {testimonial.role}
          </p>
        </div>
      </div>
    </article>
  );
}
