import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewsletterSignup } from "../features/website/homepage/component/NewsletterSignup";
import { api } from "../lib/api";

jest.mock("../lib/api", () => ({
  api: {
    post: jest.fn(),
  },
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("NewsletterSignup component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input field and Subscribe Now button", () => {
    render(<NewsletterSignup />);

    expect(
      screen.getByPlaceholderText(/enter your email address/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /subscribe now/i }),
    ).toBeInTheDocument();
  });

  it("shows an error when submitting an empty email", () => {
    render(<NewsletterSignup />);

    const button = screen.getByRole("button", { name: /subscribe now/i });
    fireEvent.click(button);

    expect(
      screen.getByText(/please enter your email address/i),
    ).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("shows an error when submitting an invalid email", () => {
    render(<NewsletterSignup />);

    const input = screen.getByPlaceholderText(/enter your email address/i);
    fireEvent.change(input, { target: { value: "invalid-email" } });

    const form = screen.getByRole("form", { name: /newsletter signup/i });
    fireEvent.submit(form);

    expect(
      screen.getByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it("submits valid email and renders success message", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "Success" },
    });

    render(<NewsletterSignup />);

    const input = screen.getByPlaceholderText(/enter your email address/i);
    fireEvent.change(input, { target: { value: "valid.reader@example.com" } });

    const button = screen.getByRole("button", { name: /subscribe now/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/newsletter/subscribe", {
        email: "valid.reader@example.com",
      });
      expect(
        screen.getByText(/thank you for subscribing!/i),
      ).toBeInTheDocument();
    });
  });

  it("handles duplicate/error response from backend and displays failure message", async () => {
    const errorResponse = {
      isAxiosError: true,
      response: {
        status: 400,
        data: {
          message: "This email is already subscribed to our newsletter.",
        },
      },
    };
    (api.post as jest.Mock).mockRejectedValueOnce(errorResponse);

    render(<NewsletterSignup />);

    const input = screen.getByPlaceholderText(/enter your email address/i);
    fireEvent.change(input, { target: { value: "already@subscribed.com" } });

    const button = screen.getByRole("button", { name: /subscribe now/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/this email is already subscribed to our newsletter/i),
      ).toBeInTheDocument();
    });
  });
});
