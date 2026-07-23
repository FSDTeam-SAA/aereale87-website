import { AuthorsPage } from "@/features/website/author/component/AuthorsPage";
import { fetchFoundingAuthors } from "@/features/website/catalog/api/catalog.api";

async function getFoundingAuthors() {
  try {
    return fetchFoundingAuthors();
  } catch (error) {
    console.warn("Failed to fetch authors data:", error);
    return {
      authors: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }
}

export default async function Authors() {
  const { authors } = await getFoundingAuthors();

  // Transform API data to match existing AuthorItem type
  const transformedAuthors = authors.map((author) => ({
    href: `/authors/${author.id}`,
    name: author.profile
      ? `${author.profile.firstName || ""} ${author.profile.lastName || ""}`.trim() ||
        author.username
      : author.username,
    badge: "Founding Author",
    books: String(author.bookCount),
    rating: "0.0",
    readers: "0",
    avatar: author.profile?.avatarUrl || "/placeholder-author.png",
  }));

  return <AuthorsPage authors={transformedAuthors} />;
}
