import { products } from "@/data/catalog";

import type { CheckoutItem } from "../types/checkout.types";

const checkoutSeed = [
  {
    slug: "architecture-of-leadership",
    format: "Hardcover",
    price: "$28.00",
  },
  {
    slug: "whispers-of-the-forest",
    format: "Audiobook",
    price: "$14.99",
  },
];

export const checkoutItems: CheckoutItem[] = checkoutSeed.map((seed) => {
  const product = products.find((item) => item.slug === seed.slug)!;

  return {
    slug: product.slug,
    title: product.title,
    format: seed.format,
    price: seed.price,
    cover: product.cover,
    quantity: 1,
  };
});

export const checkoutTotals = {
  subtotal: "$42.99",
  shipping: "Free",
  tax: "$3.00",
  total: "$45.99",
};
