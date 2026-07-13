import { products } from "@/data/catalog";

import type { CartBenefit, CartItem } from "../types/cart.types";

const cartSlugs = [
  "architecture-of-leadership",
  "pain-habit",
  "create-your-own-business",
];

export const cartItems: CartItem[] = cartSlugs.map((slug) => {
  const product = products.find((item) => item.slug === slug)!;

  return {
    slug: product.slug,
    title: product.title,
    author: product.author,
    price: product.price,
    cover: product.cover,
    quantity: 1,
  };
});

export const cartBenefits: CartBenefit[] = [
  {
    title: "Free Shipping",
    description: "Free domestic shipping on orders over $50",
  },
  {
    title: "Secure Payments",
    description: "SSL encryption protects your payment information",
  },
  {
    title: "24/7 Support",
    description: "Our book experts are here to help anytime",
  },
  {
    title: "Instant Downloads",
    description: "eBooks and audio files are available immediately",
  },
];
