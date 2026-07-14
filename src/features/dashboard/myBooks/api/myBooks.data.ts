import { products } from "@/data/catalog";

import type { MyBook } from "../types/myBooks.types";

const librarySlugs = [
  "create-your-own-business",
  "still-single",
  "the-silent-echo",
  "make-your-happy",
];

export const myBooks: MyBook[] = librarySlugs.map((slug) => {
  const product = products.find((item) => item.slug === slug)!;

  return {
    slug: product.slug,
    title: "The Silent Echo",
    author: "Evelyn Reed",
    cover: product.cover,
    rating: 4,
  };
});
