import { BookOpen, Clock3, Grid3X3 } from "lucide-react";

import { api } from "@/lib/api";
import type {
  DashboardStat,
  LibraryBook,
} from "@/features/website/dashboard/types/dashboard.types";
import type { MyBooksData } from "../types/myBooks.types";

type ApiEnvelope<T> = {
  data?: T;
};

type BackendLibraryItem = {
  orderItemId: string;
  orderId: string;
  purchasedAt: string;
  quantity: number;
  book: {
    id: string;
    title: string;
    bookCover: string | null;
    authorId: string;
  };
  format: {
    id: string;
    type: "EBOOK" | "AUDIOBOOK";
  };
  accessType: "DOWNLOAD" | "STREAM";
};

type BackendLibraryAccess = {
  orderItemId: string;
  bookId: string;
  format: "EBOOK" | "AUDIOBOOK";
  accessType: "DOWNLOAD" | "STREAM";
  url: string;
  expiresIn: number;
  mimeType: string | null;
  fileName: string;
};

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  return payload && typeof payload === "object" && "data" in payload
    ? ((payload as ApiEnvelope<T>).data as T)
    : (payload as T);
}

function buildStats(books: LibraryBook[]): DashboardStat[] {
  const audiobooks = books.filter((book) => book.format === "AUDIOBOOK").length;
  const ebooks = books.filter((book) => book.format === "EBOOK").length;

  return [
    {
      label: "Total Library Items",
      value: String(books.length),
      badge: "",
      tone: "blue",
      icon: Grid3X3,
    },
    {
      label: "Audiobooks",
      value: String(audiobooks),
      badge: "",
      tone: "orange",
      icon: Clock3,
    },
    {
      label: "eBooks",
      value: String(ebooks),
      badge: "",
      tone: "orange",
      icon: BookOpen,
    },
  ];
}

export async function getMyBooks(): Promise<MyBooksData> {
  const response = await api.get<
    ApiEnvelope<BackendLibraryItem[]> | BackendLibraryItem[]
  >("/library");
  const items = unwrap(response.data);

  const books: LibraryBook[] = items.map((item) => ({
    orderItemId: item.orderItemId,
    bookId: item.book.id,
    slug: item.book.id,
    title: item.book.title,
    author: "Purchased item",
    cover: item.book.bookCover || "/no-image.jpg",
    rating: 0,
    format: item.format.type,
    accessType: item.accessType,
    purchasedAt: new Date(item.purchasedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  return {
    books,
    stats: buildStats(books),
  };
}

export async function getLibraryAccess(orderItemId: string) {
  const response = await api.post<
    ApiEnvelope<BackendLibraryAccess> | BackendLibraryAccess
  >(`/library/${orderItemId}/access`);
  return unwrap(response.data);
}
