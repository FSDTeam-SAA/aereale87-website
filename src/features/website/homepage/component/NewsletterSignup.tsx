"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../lib/api";
import { toast } from "sonner";

import { HomeSection } from "./primitives";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await api.post("/newsletter/subscribe", { email });
      toast.success("Successfully subscribed to the newsletter!");
      setEmail("");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to subscribe";
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={loading}
              className="h-[52px] w-full min-w-0 border border-[var(--home-border)] bg-white px-5 text-[15px] text-[var(--home-green-deep)] outline-none transition placeholder:text-[var(--home-muted)] focus:border-[var(--home-gold)] disabled:opacity-50 sm:h-[58px] sm:flex-1 sm:px-6 sm:text-[16px]"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-[52px] w-full items-center justify-center border border-[var(--home-gold)] bg-[var(--home-gold)] px-6 text-[15px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-transparent hover:text-[var(--home-gold)] [font-family:var(--font-display)] disabled:opacity-50 sm:h-[58px] sm:min-w-[218px] sm:w-auto sm:px-8 sm:text-[16px]"
            >
              {loading ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>
          <p className="mt-4 text-[16px] leading-[1.2] text-[var(--home-muted)]">
            By subscribing, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </HomeSection>
  );
}
