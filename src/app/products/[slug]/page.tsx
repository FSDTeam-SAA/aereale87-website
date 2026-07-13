import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/features/website/product/component/ProductDetailPage";
import { getProductBySlug, products } from "@/data/catalog";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const baseSlug = slug.replace(/-\d+-\d+$/, "");
  const product = getProductBySlug(baseSlug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
