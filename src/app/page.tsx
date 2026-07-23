import HomePage from "@/features/website/homepage/component/HomePage";
import {
  fetchFoundingAuthorBooks,
  fetchFoundingAuthors,
} from "@/features/website/catalog/api/catalog.api";

async function fetchData() {
  try {
    const [authorsRes, booksRes] = await Promise.allSettled([
      fetchFoundingAuthors(),
      fetchFoundingAuthorBooks({ limit: 12 }),
    ]);

    return {
      authors:
        authorsRes.status === "fulfilled" ? authorsRes.value.authors : [],
      books: booksRes.status === "fulfilled" ? booksRes.value.books : [],
    };
  } catch (error) {
    console.warn("Failed to fetch homepage data:", error);
    return { authors: [], books: [] };
  }
}

export default async function Home() {
  const { authors: apiAuthors, books: apiBooks } = await fetchData();
  return <HomePage apiAuthors={apiAuthors} apiBooks={apiBooks} />;
}
