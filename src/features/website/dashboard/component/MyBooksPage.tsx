import { libraryBooks } from "../api/dashboard.data";
import { DashboardShell } from "./DashboardShell";
import { LibraryBookCard } from "./LibraryBookCard";
import { StatsGrid } from "./StatsGrid";

export function MyBooksPage() {
  return (
    <DashboardShell activeHref="/my-books" title="My Library">
      <StatsGrid />
      <section className="mt-6">
        <h2 className="text-[24px] font-bold leading-[1.2]">My Books</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {libraryBooks.map((book) => (
            <LibraryBookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
