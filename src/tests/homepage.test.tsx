import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

describe("Home page", () => {
  it("renders key homepage landmarks and sections", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /discover stories that inspire, teach & transform/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /best sellers/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /featured books/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /what ourreaders say/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /meet future founding authors/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /join the wonder community/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("navigation", { name: /primary/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("form", { name: /newsletter signup/i }),
    ).toBeInTheDocument();
  });
});
