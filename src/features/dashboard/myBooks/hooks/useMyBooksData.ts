import { useQuery } from "@tanstack/react-query";

import { getMyBooks } from "../api/myBooks.api";

export function useMyBooksData() {
  return useQuery({
    queryKey: ["my-library"],
    queryFn: getMyBooks,
  });
}
