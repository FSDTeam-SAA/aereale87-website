"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SiteHeader } from "@/components/shared/site/SiteHeader";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";
import { api } from "@/lib/api";

export function ContactPage() {
  const router = useRouter();
  const { status } = useSession();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status !== "authenticated") {
      toast.error("Please sign in to contact the team.");
      router.push("/auth/login?callbackUrl=/contact");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/contact", { subject, message });
      toast.success("Your message has been sent to the admin team.");
      setSubject("");
      setMessage("");
    } catch (error: unknown) {
      const responseMessage =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === "string"
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Unable to send your message.";
      toast.error(responseMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/about" />

      <section className="bg-[var(--home-paper)] px-5 py-16 text-center sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[880px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[var(--home-gold)]">
            Contact
          </p>
          <h1 className="mt-4 text-[42px] font-bold leading-[1.12] sm:text-[54px]">
            Contact The Wonder Emporium Team
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[18px] leading-[1.5] text-[var(--home-muted)] sm:text-[22px]">
            Send questions about orders, publishing, payouts, or your account
            directly to the admin team.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[900px] border border-[var(--home-border)] bg-white p-8 lg:p-10">
          <form
            aria-label="contact form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="contact-subject"
                className="text-[12px] font-semibold uppercase tracking-[0.08em]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                required
                className="mt-2 h-12 w-full border border-[var(--home-border)] px-4 text-[14px] outline-none transition focus:border-[var(--home-gold)]"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="text-[12px] font-semibold uppercase tracking-[0.08em]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={8}
                className="mt-2 w-full border border-[var(--home-border)] px-4 py-3 text-[14px] outline-none transition focus:border-[var(--home-gold)]"
                placeholder="Tell us what you need help with."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
