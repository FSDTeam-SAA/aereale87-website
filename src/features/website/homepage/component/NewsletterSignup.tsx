"use client";

import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { api } from "../../../../lib/api";
import { toast } from "sonner";

import { HomeSection } from "./primitives";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const extractErrorMessage = (error: unknown): string => {
    if (
      axios.isAxiosError<{
        message?: string | string[];
        error?: string;
        data?: { message?: string };
      }>(error)
    ) {
      const resData = error.response?.data;
      if (resData) {
        if (typeof resData.message === "string") return resData.message;
        if (Array.isArray(resData.message) && resData.message.length > 0)
          return resData.message[0];
        if (resData.data?.message) return resData.data.message;
        if (typeof resData.error === "string") return resData.error;
      }
      if (error.response?.status === 400) {
        return "This email is either invalid or already subscribed.";
      }
      return error.message || "Failed to subscribe. Please try again.";
    }
    return error instanceof Error
      ? error.message
      : "Failed to subscribe. Please try again.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      const msg = "Please enter your email address.";
      setStatusMessage({ type: "error", text: msg });
      toast.error(msg);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      const msg = "Please enter a valid email address (e.g. name@example.com).";
      setStatusMessage({ type: "error", text: msg });
      toast.error(msg);
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      await api.post("/newsletter/subscribe", { email: trimmedEmail });
      const successMsg =
        "Thank you for subscribing! Check your inbox for updates.";
      setStatusMessage({ type: "success", text: successMsg });
      toast.success(successMsg);
      setEmail("");
    } catch (error: unknown) {
      const message = extractErrorMessage(error);
      setStatusMessage({ type: "error", text: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeSection
      id="newsletter"
      className="relative overflow-hidden bg-[var(--home-paper)]"
    >
      <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-[linear-gradient(165deg,transparent_24%,rgba(255,255,255,0.4)_24%,rgba(255,255,255,0.4)_76%,transparent_76%)] lg:block" />
      <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(345deg,transparent_24%,rgba(255,255,255,0.4)_24%,rgba(255,255,255,0.4)_76%,transparent_76%)] lg:block" />
      <div className="relative mx-auto max-w-[1440px] text-center">
        <div className="mx-auto flex max-w-[676px] flex-col items-center">
          <Mail className="mb-4 size-12 text-[var(--home-green)]" />
          <h2 className="text-balance text-[38px] leading-[1.2] font-semibold text-[var(--home-green-deep)] sm:text-[48px]">
            Join The Wonder Community
          </h2>
          <p className="mt-4 text-[20px] leading-[1.2] text-[var(--home-muted)] sm:text-[24px]">
            Receive exclusive book releases, personalized recommendations, and
            special offers directly to your inbox.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full flex-col gap-4 sm:flex-row"
            aria-label="Newsletter signup"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Enter your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (statusMessage) setStatusMessage(null);
              }}
              placeholder="Enter your email address"
              disabled={loading}
              className="h-[52px] w-full min-w-0 border border-[var(--home-border)] bg-white px-5 text-[15px] text-[var(--home-green-deep)] outline-none transition placeholder:text-[var(--home-muted)] focus:border-[var(--home-gold)] disabled:opacity-50 sm:h-[58px] sm:flex-1 sm:px-6 sm:text-[16px]"
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 border border-[var(--home-gold)] bg-[var(--home-gold)] px-6 text-[15px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-transparent hover:text-[var(--home-gold)] [font-family:var(--font-display)] disabled:opacity-50 sm:h-[58px] sm:min-w-[218px] sm:w-auto sm:px-8 sm:text-[16px]"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                "Subscribe Now"
              )}
            </button>
          </form>

          {/* Inline Confirmation or Error Status Message */}
          {statusMessage && (
            <div
              role="alert"
              className={`mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                  : "bg-red-50 text-red-700 ring-1 ring-red-200"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="size-4 shrink-0 text-red-500" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <p className="mt-4 text-[16px] leading-[1.2] text-[var(--home-muted)]">
            By subscribing, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </HomeSection>
  );
}
