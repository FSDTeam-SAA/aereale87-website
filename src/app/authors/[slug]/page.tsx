import { notFound } from "next/navigation";

import { AuthorDetailPage } from "@/features/website/author/component/AuthorDetailPage";
import {
  fetchFoundingAuthor,
  fetchFoundingAuthorBooks,
  fetchCatalogBooks,
  mapCatalogBookToProduct,
} from "@/features/website/catalog/api/catalog.api";
import type { AuthorPageData } from "@/data/catalog";
import type { Product } from "@/data/catalog";

type AuthorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function dedupeProducts(products: Product[]) {
  const seen = new Set<string>();

  return products.filter((product) => {
    if (seen.has(product.slug)) {
      return false;
    }

    seen.add(product.slug);
    return true;
  });
}

function buildShelfProducts(
  primaryProducts: Product[],
  fallbackProducts: Product[],
  count: number,
) {
  const seen = new Set<string>();

  return [...primaryProducts, ...fallbackProducts]
    .filter((product) => {
      if (seen.has(product.slug)) {
        return false;
      }

      seen.add(product.slug);
      return true;
    })
    .slice(0, count);
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  let author: AuthorPageData | null = null;

  try {
    const authorData = await fetchFoundingAuthor(slug);
    const booksData = await fetchCatalogBooks({
      authorId: slug,
      limit: 50,
    }).catch(() => null);
    const name = authorData.profile
      ? `${authorData.profile.firstName || ""} ${authorData.profile.lastName || ""}`.trim() ||
        authorData.username
      : authorData.username;
    const authorProducts = dedupeProducts(
      (booksData?.books ?? []).map(mapCatalogBookToProduct),
    );
    const preferredCategory = authorData.categories[0];
    const [foundingBooksData, relatedBooksData, catalogBooksData] =
      await Promise.all([
        fetchFoundingAuthorBooks({ limit: 20 }).catch(() => null),
        fetchCatalogBooks({
          category: preferredCategory,
          limit: 20,
        }).catch(() => null),
        fetchCatalogBooks({ limit: 20 }).catch(() => null),
      ]);
    const foundingProducts = dedupeProducts(
      (foundingBooksData?.books ?? []).map(mapCatalogBookToProduct),
    );
    const catalogProducts = dedupeProducts(
      (catalogBooksData?.books ?? []).map(mapCatalogBookToProduct),
    );
    const relatedProducts = dedupeProducts(
      (relatedBooksData?.books ?? [])
        .filter((book) => book.author?.id !== slug)
        .map(mapCatalogBookToProduct),
    );
    const shelfFallbackProducts = dedupeProducts([
      ...foundingProducts.filter((product) => product.author !== name),
      ...relatedProducts,
      ...catalogProducts.filter((product) => product.author !== name),
    ]);
    const topRatedBooks = [...authorProducts]
      .sort(
        (left, right) =>
          right.rating - left.rating || right.reviewCount - left.reviewCount,
      )
      .slice(0, 5);
    const popularBooks = [...authorProducts]
      .sort(
        (left, right) =>
          right.reviewCount - left.reviewCount || right.rating - left.rating,
      )
      .slice(0, 5);
    const allBooks = [...authorProducts].slice(0, 10);
    const relatedBooks = relatedProducts.slice(0, 5);
    const visibleTopRatedBooks = buildShelfProducts(
      topRatedBooks,
      shelfFallbackProducts,
      5,
    );
    const visibleRelatedBooks = buildShelfProducts(
      relatedBooks,
      shelfFallbackProducts,
      5,
    );
    const visiblePopularBooks = buildShelfProducts(
      popularBooks,
      shelfFallbackProducts,
      5,
    );
    const visibleAllBooks = buildShelfProducts(
      allBooks,
      shelfFallbackProducts,
      10,
    );
    const averageRating =
      authorProducts.length > 0
        ? (
            authorProducts.reduce((sum, product) => sum + product.rating, 0) /
            authorProducts.length
          ).toFixed(1)
        : "0.0";

    author = {
      slug: authorData.id,
      name,
      role: "Founding Author",
      bio: authorData.profile?.bio || "No biography has been added yet.",
      books: String(authorData.bookCount),
      rating: averageRating,
      readers: "0",
      image: authorData.profile?.avatarUrl || "/placeholder-author.png",
      shelves: [
        { title: "Top Rated", products: visibleTopRatedBooks },
        { title: "Related Books", products: visibleRelatedBooks },
        { title: "Popular Books", products: visiblePopularBooks },
        { title: "All Books", products: visibleAllBooks },
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
