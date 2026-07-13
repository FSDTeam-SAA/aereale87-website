import { Suspense } from "react";

import { CategoryPage } from "@/features/website/catalog/component/CategoryPage";

export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <main
          className="min-h-screen bg-[var(--home-surface)]"
          aria-busy="true"
        />
      }
    >
      <CategoryPage />
    </Suspense>
  );
}
