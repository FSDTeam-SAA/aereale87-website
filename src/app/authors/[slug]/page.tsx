import { notFound } from "next/navigation";

import { AuthorDetailPage } from "@/features/website/author/component/AuthorDetailPage";
import { authorPages, getAuthorBySlug } from "@/data/catalog";

type AuthorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return authorPages.map((author) => ({
    slug: author.slug,
  }));
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  return <AuthorDetailPage author={author} />;
}
