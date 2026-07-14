import { myBooks } from "../api/myBooks.data";

export function useMyBooksData() {
  return {
    books: myBooks,
  };
}
