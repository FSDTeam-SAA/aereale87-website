import { HomeCta } from "@/features/website/homepage/component";
import type { AuthorBookShelf } from "@/data/catalog";

import { AuthorBookCard } from "./AuthorBookCard";

export function AuthorBookShelfSection({
  shelf,
  className,
}: {
  shelf: AuthorBookShelf;
  className?: string;
}) {
  return (
    <section
      className={`px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[40px] font-bold leading-[1.1] text-[var(--home-green)]">
            {shelf.title}
          </h2>
          <HomeCta
            href="/categories"
            className="h-[50px] w-full px-6 text-[12px] sm:w-auto"
          >
            View All
          </HomeCta>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {shelf.products.map((product) => (
            <AuthorBookCard
              key={`${shelf.title}-${product.slug}`}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
