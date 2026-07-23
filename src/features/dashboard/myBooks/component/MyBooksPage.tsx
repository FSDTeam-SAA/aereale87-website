"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { DashboardShell } from "@/features/website/dashboard/component/DashboardShell";
import { LibraryBookCard } from "@/features/website/dashboard/component/LibraryBookCard";
import { StatsGrid } from "@/features/website/dashboard/component/StatsGrid";

import { getLibraryAccess } from "../api/myBooks.api";
import { useMyBooksData } from "../hooks/useMyBooksData";
import type { LibraryBook } from "@/features/website/dashboard/types/dashboard.types";

export function MyBooksPage() {
  const libraryQuery = useMyBooksData();
  const accessMutation = useMutation({
    mutationFn: getLibraryAccess,
    onSuccess: (result) => {
      window.open(result.url, "_blank", "noopener,noreferrer");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to access library item.");
    },
  });

  const books = libraryQuery.data?.books ?? [];
  const stats = libraryQuery.data?.stats ?? [];

  function handleAccess(book: LibraryBook) {
    accessMutation.mutate(book.orderItemId);
  }

  return (
    <DashboardShell activeHref="/my-books" title="My Library">
      <StatsGrid stats={stats} />
      <section className="mt-6">
        <h2 className="text-[24px] font-bold leading-[1.2]">My Books</h2>
        {libraryQuery.isLoading ? (
          <p className="mt-4 border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
            Loading your library...
          </p>
        ) : null}
        {!libraryQuery.isLoading && !books.length ? (
          <p className="mt-4 border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
            No digital purchases are available in your library yet.
          </p>
        ) : null}
        <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {books.map((book) => (
            <LibraryBookCard
              key={book.orderItemId}
              book={book}
              onAccess={handleAccess}
              pending={
                accessMutation.isPending &&
                accessMutation.variables === book.orderItemId
              }
            />
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
