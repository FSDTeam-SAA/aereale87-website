import { render, screen } from "@testing-library/react";

import { AuthorDetailPage } from "@/features/website/author/component/AuthorDetailPage";
import { CategoryPage } from "@/features/website/catalog/component/CategoryPage";
import { ProductDetailPage } from "@/features/website/product/component/ProductDetailPage";
import { getAuthorBySlug, getProductBySlug } from "@/data/catalog";

jest.mock("next/navigation", () => ({
  useSearchParams: () =>
    new URLSearchParams("category=Leadership&format=eBook"),
}));

describe("Catalog pages", () => {
  it("renders the category page with filter sidebar and product grid", () => {
    render(<CategoryPage />);

    expect(
      screen.getByRole("heading", { name: /curated categories/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /price range/i }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("link", { name: /the architecture of leadership/i })
        .length,
    ).toBeGreaterThan(0);

    expect(screen.getByText(/showing/i)).toBeInTheDocument();
  });

  it("renders the product detail page sections for a dynamic product", () => {
    const product = getProductBySlug("architecture-of-leadership");

    expect(product).toBeDefined();

    render(<ProductDetailPage product={product!} />);

    expect(
      screen.getByRole("heading", {
        name: /the architecture of leadership/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /about this book/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /book specifications/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /customer reviews/i }),
    ).toBeInTheDocument();
  });

  it("renders the author details page with reusable shelf sections", () => {
    const author = getAuthorBySlug("rodney-smith");

    expect(author).toBeDefined();

    render(<AuthorDetailPage author={author!} />);

    expect(
      screen.getByRole("heading", { name: /rodney smith/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /top rated/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /popular books/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /all books/i }),
    ).toBeInTheDocument();
  });
});
