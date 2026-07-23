import type { Product, ProductFormat } from "@/data/catalog";

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type BookCategory = {
  name: string;
  count: number;
};

export type CatalogBook = {
  id: string;
  authorId?: string;
  title: string;
  description?: string | null;
  bookCover: string | null;
  isbn?: string | null;
  category: string | null;
  tags?: string[];
  language?: string | null;
  ageGroup?: string | null;
  publicationDetails?: string | null;
  createdAt?: string;
  updatedAt?: string;
  sellingPrice?: number;
  formats: Array<{
    id?: string;
    formatType: string;
    listPrice: number;
    sku?: string | null;
    pageCount?: number | null;
    trimSize?: string | null;
  }>;
  author?: {
    id?: string;
    username: string;
    email?: string;
    isFoundingAuthor?: boolean;
    profile: {
      firstName: string | null;
      lastName: string | null;
      bio?: string | null;
      avatarUrl?: string | null;
    } | null;
  };
};

export type CatalogBooksResponse = {
  books: CatalogBook[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CatalogBooksQuery = {
  category?: string;
  authorId?: string;
  format?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  search?: string;
};

export type FoundingAuthorProfile = {
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  coverImageUrl: string | null;
  websiteUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  location: string | null;
};

export type FoundingAuthor = {
  id: string;
  username: string;
  isFoundingAuthor: boolean;
  createdAt: string;
  updatedAt: string;
  profile: FoundingAuthorProfile | null;
  bookCount: number;
  categories: string[];
};

export type FoundingAuthorsResponse = {
  authors: FoundingAuthor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const formatLabelMap: Record<string, string> = {
  EBOOK: "eBook",
  AUDIOBOOK: "Audio",
  HARDCOVER: "Hardcover",
  PAPERBACK: "Paperback",
};

function getLowestPrice(formats: CatalogBook["formats"]): number {
  if (!formats.length) return 0;
  return Math.min(...formats.map((format) => format.listPrice));
}

function mapFormats(formats: CatalogBook["formats"]): ProductFormat[] {
  return formats.map((format, index) => ({
    id: format.id ?? `${format.formatType}-${index}`,
    label: formatLabelMap[format.formatType] ?? format.formatType,
    price: `$${format.listPrice.toFixed(2)}`,
  }));
}

function getAuthorName(book: CatalogBook): string {
  const profile = book.author?.profile;
  const fullName =
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();
  return fullName || book.author?.username || "Unknown Author";
}

export function mapCatalogBookToProduct(book: CatalogBook): Product {
  const lowestPrice = book.sellingPrice ?? getLowestPrice(book.formats);
  const authorName = getAuthorName(book);
  const authorBio = book.author?.profile?.bio || "";
  const pageCount = book.formats.find((format) => format.pageCount)?.pageCount;

  return {
    slug: book.id,
    title: book.title,
    author: authorName,
    category: book.category || "General",
    filterCategory: book.category || "All Categories",
    price: `$${lowestPrice.toFixed(2)}`,
    rating: 0,
    reviewCount: 0,
    cover: book.bookCover || "/no-image.jpg",
    formats: mapFormats(book.formats),
    shortDescription: book.description || "",
    aboutQuote: "",
    aboutBody: book.description || "",
    specs: [
      { label: "PUBLISHER", value: book.publicationDetails || "Wonder Press" },
      { label: "LANGUAGE", value: book.language || "Not specified" },
      ...(pageCount ? [{ label: "PAGES", value: `${pageCount} Pages` }] : []),
      ...(book.isbn ? [{ label: "ISBN", value: book.isbn }] : []),
      ...(book.createdAt
        ? [
            {
              label: "PUBLICATION DATE",
              value: new Date(book.createdAt).toLocaleDateString(),
            },
          ]
        : []),
      { label: "CATEGORY", value: book.category || "General" },
    ],
    authorProfile: {
      slug: book.author?.id,
      name: authorName,
      role: "Author",
      bio: authorBio,
      books: "0",
      rating: "0.0",
      readers: "0",
      image: book.author?.profile?.avatarUrl || "/placeholder-author.png",
    },
    reviews: [],
  };
}

async function publicFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}).`);
  }

  const payload = (await response.json()) as ApiEnvelope<T> | T;
  return "data" in (payload as ApiEnvelope<T>)
    ? (payload as ApiEnvelope<T>).data
    : (payload as T);
}

export async function fetchBookCategories(): Promise<{
  categories: BookCategory[];
  total: number;
}> {
  return publicFetch<{
    categories: BookCategory[];
    total: number;
  }>("/books/categories");
}

export async function fetchCatalogBooks(
  query: CatalogBooksQuery = {},
): Promise<CatalogBooksResponse> {
  const params = new URLSearchParams();
  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 12));

  if (query.category && query.category !== "All Categories") {
    params.set("category", query.category);
  }
  if (query.authorId && query.authorId !== "All Authors") {
    params.set("authorId", query.authorId);
  }
  if (query.minPrice != null) {
    params.set("minPrice", String(query.minPrice));
  }
  if (query.maxPrice != null) {
    params.set("maxPrice", String(query.maxPrice));
  }
  if (query.search) {
    params.set("search", query.search);
  }

  return publicFetch<CatalogBooksResponse>(`/books?${params.toString()}`);
}

export async function fetchFoundingAuthorBooks(
  query: CatalogBooksQuery = {},
): Promise<CatalogBooksResponse> {
  const params = new URLSearchParams();
  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 12));
  if (query.category && query.category !== "All Categories") {
    params.set("category", query.category);
  }
  if (query.search) {
    params.set("search", query.search);
  }

  return publicFetch<CatalogBooksResponse>(
    `/books/founding-authors?${params.toString()}`,
  );
}

export async function fetchFoundingAuthors(): Promise<FoundingAuthorsResponse> {
  return publicFetch<FoundingAuthorsResponse>("/authors/founding?limit=100");
}

export async function fetchFoundingAuthor(id: string): Promise<FoundingAuthor> {
  return publicFetch<FoundingAuthor>(`/authors/founding/${id}`);
}

export async function fetchBookById(id: string): Promise<CatalogBook> {
  return publicFetch<CatalogBook>(`/books/${id}`);
}

export function buildCategoryShopHref(category: string) {
  return `/categories?view=shop&category=${encodeURIComponent(category)}`;
}
