import type {
  DashboardStat,
  LibraryBook,
} from "@/features/website/dashboard/types/dashboard.types";

export type MyBooksData = {
  books: LibraryBook[];
  stats: DashboardStat[];
};
