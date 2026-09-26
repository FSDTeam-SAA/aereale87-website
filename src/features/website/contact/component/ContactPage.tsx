"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  HelpCircle,
  Mail,
  MessageSquare,
  Package,
  PenTool,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SiteHeader } from "@/components/shared/site/SiteHeader";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";
import { api } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SUPPORT_TOPICS = [
  { id: "orders", label: "Order & Shipping Inquiries" },
  { id: "digital", label: "Digital Books & Audiobook Access" },
  { id: "author", label: "Author Account & Publishing" },
  { id: "billing", label: "Billing & Payment Inquiries" },
  { id: "account", label: "Account & Technical Support" },
  { id: "general", label: "General Feedback & Partnerships" },
];

const QUICK_CHANNELS = [
  {
    icon: Package,
    title: "Orders & Shipping",
    description:
      "Track deliveries, print-on-demand status, and package inquiries.",
    topicId: "orders",
  },
  {
    icon: BookOpen,
    title: "Digital Library",
    description: "Assistance with eBook reading, audio players, and downloads.",
    topicId: "digital",
  },
  {
    icon: PenTool,
    title: "Author & Publishing",
    description: "Royalty questions, manuscript uploads, and KYC verification.",
    topicId: "author",
  },
  {
    icon: CreditCard,
    title: "Billing & Account",
    description: "Payment receipts, refund guidelines, and account access.",
    topicId: "billing",
  },
];

const FAQS = [
  {
    question: "How do I access my purchased digital books and audiobooks?",
    answer:
      "Once completed, all your eBook and audiobook purchases are immediately available in your library. Simply navigate to My Library (/my-books) from your account menu to read or listen on any device.",
  },
  {
    question: "How long does physical book printing and shipping take?",
    answer:
      "Printed editions are produced on-demand with premium paper and binding. Production typically takes 3 to 5 business days, after which your order is shipped with real-time tracking sent to your email.",
  },
  {
    question: "What is your refund and replacement policy?",
    answer:
      "If a physical book arrives damaged or misprinted, we provide a free replacement or full refund upon receiving a photo of the item. Digital products are delivered immediately and are non-refundable unless there is an unresolved technical defect.",
  },
  {
    question: "I am an author. How do royalty payouts work?",
    answer:
      "Royalties are tracked in real-time within your Author Dashboard. Payouts are distributed directly to your connected Stripe account according to our transparent author terms.",
  },
  {
    question: "How can I contact customer support directly?",
    answer:
      "You can submit a ticket using the contact form below or email us directly at Support@thewanderemporium.com. Our support team operates Monday through Friday, 9:00 AM – 6:00 PM EST, and responds to all tickets within 24 hours.",
  },
];

function getMatchedTopic(queryTopic: string | null | undefined): string {
  if (!queryTopic) return "orders";
  const matched = SUPPORT_TOPICS.find(
    (t) =>
      t.id.toLowerCase() === queryTopic.toLowerCase() ||
      t.label.toLowerCase().includes(queryTopic.toLowerCase()),
  );
  return matched ? matched.id : "orders";
}

function ContactPageInner() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const urlTopic = searchParams?.get("topic") ?? "";
  const [prevUrlTopic, setPrevUrlTopic] = useState(urlTopic);
  const [topic, setTopic] = useState(() => getMatchedTopic(urlTopic));

  if (urlTopic !== prevUrlTopic) {
    setPrevUrlTopic(urlTopic);
    const matched = getMatchedTopic(urlTopic);
    setTopic(matched);
  }

  const sessionUser = session?.user;
  const [prevUser, setPrevUser] = useState(sessionUser);
  const [name, setName] = useState(sessionUser?.name ?? "");
  const [email, setEmail] = useState(sessionUser?.email ?? "");

  if (sessionUser !== prevUser) {
    setPrevUser(sessionUser);
    if (sessionUser?.name && !name) setName(sessionUser.name);
    if (sessionUser?.email && !email) setEmail(sessionUser.email);
  }

  const [orderNumber, setOrderNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  function handleSelectChannel(topicId: string) {
    setTopic(topicId);
    const formElement = document.getElementById("support-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please provide a valid email address.");
      return;
    }

    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in both the subject and message.");
      return;
    }

    setSubmitting(true);
    try {
      const selectedTopic =
        SUPPORT_TOPICS.find((t) => t.id === topic)?.label || topic;
      const fullSubject = `[${selectedTopic}] ${subject.trim()}${
        orderNumber.trim() ? ` (Order: #${orderNumber.trim()})` : ""
      }`;

      await api.post("/contact", {
        name: name.trim() || undefined,
        email: email.trim(),
        subject: fullSubject,
        message: message.trim(),
      });

      setSubmittedSuccess(true);
      toast.success("Support ticket submitted! We will respond shortly.");
      setSubject("");
      setMessage("");
      setOrderNumber("");
    } catch (error: unknown) {
      const responseMessage =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === "string"
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Unable to submit your request at this time. Please try again or email us directly.";
      toast.error(responseMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/contact" />

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-[var(--home-paper)] px-5 py-14 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[1000px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(195,164,88,0.4)] bg-white/70 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[1.2px] text-[var(--home-gold)] shadow-sm">
            <HelpCircle className="size-3.5" />
            Support & Help Center
          </span>

          <h1 className="mt-5 text-[38px] font-bold leading-[1.12] text-[var(--home-green-deep)] sm:text-[50px] lg:text-[56px]">
            How Can We Assist You Today?
          </h1>

          <p className="mx-auto mt-4 max-w-[700px] text-[16px] leading-[1.55] text-[var(--home-muted)] sm:text-[19px]">
            Have a question about an order, digital access, or author
            publishing? Browse quick topics below or send a message directly to
            our support team.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[var(--home-muted)]">
            <span className="inline-flex items-center gap-2 font-medium">
              <Clock className="size-4 text-[var(--home-gold)]" />
              Typical response time: Within 24 hours
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <ShieldCheck className="size-4 text-[var(--home-gold)]" />
              Dedicated 1-on-1 human support
            </span>
          </div>
        </div>
      </section>

      {/* ── Quick Channels ── */}
      <section className="px-5 py-12 sm:px-8 lg:px-[120px]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_CHANNELS.map((channel) => {
              const Icon = channel.icon;
              const isSelected = topic === channel.topicId;

              return (
                <button
                  key={channel.title}
                  type="button"
                  onClick={() => handleSelectChannel(channel.topicId)}
                  className={`group flex flex-col text-left border p-6 transition-all duration-200 ${
                    isSelected
                      ? "border-[var(--home-gold)] bg-white shadow-[0_8px_24px_rgba(27,46,36,0.08)] ring-1 ring-[var(--home-gold)]"
                      : "border-[var(--home-border)] bg-white hover:border-[var(--home-gold)] hover:shadow-sm"
                  }`}
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-sm bg-[var(--home-surface)] text-[var(--home-green-deep)] transition group-hover:bg-[var(--home-gold)] group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-4 text-[17px] font-bold text-[var(--home-green-deep)]">
                    {channel.title}
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[var(--home-muted)]">
                    {channel.description}
                  </p>
                  <span className="mt-4 text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--home-gold)] transition group-hover:translate-x-1">
                    Select Topic →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Main Form & Contact Info Section ── */}
      <section
        id="support-form"
        className="px-5 py-12 sm:px-8 lg:px-[120px] lg:py-16"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.25fr_0.75fr] xl:gap-16">
          {/* Contact Form Card */}
          <div className="border border-[var(--home-border)] bg-white p-7 sm:p-10 shadow-[0_4px_24px_rgba(27,46,36,0.03)]">
            <div className="border-b border-[var(--home-border)] pb-5">
              <h2 className="text-[24px] font-bold text-[var(--home-green-deep)] sm:text-[28px]">
                Send a Support Request
              </h2>
              <p className="mt-1 text-[14px] text-[var(--home-muted)]">
                Fill out the form below and an agent will follow up via email.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="my-8 rounded-md bg-[var(--home-surface)] p-8 text-center">
                <CheckCircle2 className="mx-auto size-12 text-[var(--home-green-deep)]" />
                <h3 className="mt-4 text-[20px] font-bold text-[var(--home-green-deep)]">
                  Message Sent Successfully!
                </h3>
                <p className="mx-auto mt-2 max-w-[420px] text-[15px] text-[var(--home-muted)]">
                  Thank you for reaching out. We have received your inquiry and
                  our team is already reviewing it.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedSuccess(false)}
                  className="mt-6 inline-flex h-10 items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--home-green)]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Topic Selector */}
                <div>
                  <label
                    htmlFor="support-topic"
                    className="block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--home-green-deep)]"
                  >
                    Inquiry Topic
                  </label>
                  <select
                    id="support-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-2 h-11 w-full border border-[var(--home-border)] bg-white px-3 text-[14px] text-[var(--home-green-deep)] outline-none transition focus:border-[var(--home-gold)]"
                  >
                    {SUPPORT_TOPICS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="support-name"
                      className="block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--home-green-deep)]"
                    >
                      Your Name
                    </label>
                    <input
                      id="support-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="mt-2 h-11 w-full border border-[var(--home-border)] px-4 text-[14px] outline-none transition focus:border-[var(--home-gold)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="support-email"
                      className="block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--home-green-deep)]"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="support-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-2 h-11 w-full border border-[var(--home-border)] px-4 text-[14px] outline-none transition focus:border-[var(--home-gold)]"
                    />
                  </div>
                </div>

                {topic === "orders" && (
                  <div>
                    <label
                      htmlFor="support-order-num"
                      className="block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--home-green-deep)]"
                    >
                      Order Number{" "}
                      <span className="text-[11px] font-normal text-[var(--home-muted)]">
                        (Optional)
                      </span>
                    </label>
                    <input
                      id="support-order-num"
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g. ORD-12345"
                      className="mt-2 h-11 w-full border border-[var(--home-border)] px-4 text-[14px] outline-none transition focus:border-[var(--home-gold)]"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="support-subject"
                    className="block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--home-green-deep)]"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="support-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of your question"
                    className="mt-2 h-11 w-full border border-[var(--home-border)] px-4 text-[14px] outline-none transition focus:border-[var(--home-gold)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="support-message"
                    className="block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--home-green-deep)]"
                  >
                    Message Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="support-message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide details so we can best help you..."
                    className="mt-2 w-full border border-[var(--home-border)] px-4 py-3 text-[14px] outline-none transition focus:border-[var(--home-gold)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 bg-[var(--home-gold)] px-8 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--home-green)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="size-4" />
                  {submitting ? "Sending Request..." : "Submit Support Request"}
                </button>
              </form>
            )}
          </div>

          {/* Direct Contact & Information Card */}
          <div className="space-y-6">
            <div className="border border-[var(--home-border)] bg-[var(--home-paper)] p-7 sm:p-8">
              <h3 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                Direct Contact Channels
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-[var(--home-muted)]">
                Reach our support staff directly through the official
                communication channels below.
              </p>

              <div className="mt-6 space-y-5 border-t border-[rgba(232,224,204,0.8)] pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--home-green-deep)] shadow-sm">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-[0.04em] text-[var(--home-green-deep)]">
                      Official Email Support
                    </h4>
                    <a
                      href="mailto:Support@thewanderemporium.com"
                      className="mt-1 block text-[15px] font-semibold text-[var(--home-gold)] hover:underline"
                    >
                      Support@thewanderemporium.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--home-green-deep)] shadow-sm">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-[0.04em] text-[var(--home-green-deep)]">
                      Operating Hours
                    </h4>
                    <p className="mt-1 text-[14px] text-[var(--home-muted)]">
                      Monday – Friday: 9:00 AM – 6:00 PM EST
                    </p>
                    <p className="text-[12px] text-[var(--home-muted)]">
                      (Weekend tickets answered on next business day)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--home-green-deep)] shadow-sm">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-[0.04em] text-[var(--home-green-deep)]">
                      Author Concierge
                    </h4>
                    <p className="mt-1 text-[14px] text-[var(--home-muted)]">
                      Priority assistance for published and founding authors on
                      manuscript submissions and payouts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="border border-[rgba(195,164,88,0.4)] bg-white p-6 shadow-sm">
              <h4 className="flex items-center gap-2 text-[15px] font-bold text-[var(--home-green-deep)]">
                <MessageSquare className="size-4 text-[var(--home-gold)]" />
                Quick Tip for Faster Support
              </h4>
              <p className="mt-2 text-[13px] leading-[1.6] text-[var(--home-muted)]">
                When inquiring about a physical book delivery, please include
                your Order Number and shipping address to expedite tracking
                investigations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions Section ── */}
      <section
        id="faq"
        className="bg-white px-5 py-14 sm:px-8 lg:px-[120px] lg:py-20"
      >
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-[var(--home-gold)]">
              Self-Service Help
            </span>
            <h2 className="mt-2 text-[32px] font-bold text-[var(--home-green-deep)] sm:text-[40px]">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-[15px] text-[var(--home-muted)] sm:text-[16px]">
              Find answers to common questions about accounts, deliveries,
              audiobooks, and author publishing.
            </p>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-[var(--home-border)] bg-[var(--home-surface)] px-6 py-1"
                >
                  <AccordionTrigger className="text-[16px] font-bold text-[var(--home-green-deep)] hover:no-underline sm:text-[17px]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-[1.65] text-[var(--home-muted)]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}

export function ContactPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[var(--home-surface)] flex items-center justify-center">
          <div className="text-[var(--home-muted)] text-[14px]">
            Loading support center...
          </div>
        </main>
      }
    >
      <ContactPageInner />
    </Suspense>
  );
}
