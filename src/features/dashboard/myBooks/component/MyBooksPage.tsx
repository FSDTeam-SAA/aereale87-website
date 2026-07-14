import { DashboardShell } from "@/features/website/dashboard/component/DashboardShell";
import { LibraryBookCard } from "@/features/website/dashboard/component/LibraryBookCard";
import { StatsGrid } from "@/features/website/dashboard/component/StatsGrid";

import { useMyBooksData } from "../hooks/useMyBooksData";

export function MyBooksPage() {
  const { books } = useMyBooksData();

  return (
    <DashboardShell activeHref="/my-books" title="My Library">
      <StatsGrid />
      <section className="mt-6">
        <h2 className="text-[24px] font-bold leading-[1.2]">My Books</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {books.map((book) => (
            <LibraryBookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
