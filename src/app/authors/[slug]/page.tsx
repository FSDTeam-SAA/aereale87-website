import { notFound } from "next/navigation";

import { AuthorDetailPage } from "@/features/website/author/component/AuthorDetailPage";
import {
  fetchFoundingAuthor,
  fetchCatalogBooks,
  mapCatalogBookToProduct,
} from "@/features/website/catalog/api/catalog.api";
import type { AuthorPageData } from "@/data/catalog";

type AuthorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  let author: AuthorPageData | null = null;

  try {
    const [authorData, booksData] = await Promise.all([
      fetchFoundingAuthor(slug),
      fetchCatalogBooks({ authorId: slug, limit: 50 }),
    ]);
    const name = authorData.profile
      ? `${authorData.profile.firstName || ""} ${authorData.profile.lastName || ""}`.trim() ||
        authorData.username
      : authorData.username;
    const products = booksData.books.map(mapCatalogBookToProduct);

    const publishedBooks = products;
    const categoryMap = new Map<string, typeof products>();
    for (const product of products) {
      const cat = product.category || "Other";
      if (!categoryMap.has(cat)) categoryMap.set(cat, []);
      categoryMap.get(cat)!.push(product);
    }
    const categoryShelves = Array.from(categoryMap.entries()).map(
      ([title, items]) => ({
        title,
        products: items,
      }),
    );

    author = {
      slug: authorData.id,
      name,
      role: "Founding Author",
      bio: authorData.profile?.bio || "No biography has been added yet.",
      books: String(authorData.bookCount),
      rating: "0.0",
      readers: "0",
      image: authorData.profile?.avatarUrl || "/placeholder-author.png",
      shelves: [
        { title: "Published Books", products: publishedBooks },
        ...(categoryShelves.length > 1
          ? [{ title: "By Category", products: products }]
          : []),
        ...categoryShelves.slice(0, 2),
      ],
    };
  } catch {
    author = null;
  }

  if (!author) {
    notFound();
  }

  return <AuthorDetailPage author={author} />;
}
