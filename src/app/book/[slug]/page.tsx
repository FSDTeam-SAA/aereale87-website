import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/features/website/product/component/ProductDetailPage";
import {
  fetchBookById,
  fetchCatalogBooks,
  mapCatalogBookToProduct,
} from "@/features/website/catalog/api/catalog.api";

type BookPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;

  let book;
  try {
    book = await fetchBookById(slug);
  } catch {
    notFound();
  }

  const product = mapCatalogBookToProduct(book);

  const otherBooks = book.author?.id
    ? await fetchCatalogBooks({ authorId: book.author.id, limit: 5 }).catch(
        () => null,
      )
    : null;

  return (
    <ProductDetailPage
      product={product}
      recommendations={otherBooks?.books
        .filter((item) => item.id !== book.id)
        .map(mapCatalogBookToProduct)}
    />
  );
}
