"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  PackageX,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface RefundDisclosureProps {
  /** Optional variant style: "card" is a full featured tab box, "inline" is a compact text link */
  variant?: "card" | "inline";
  className?: string;
}

export function RefundDisclosure({
  variant = "card",
  className = "",
}: RefundDisclosureProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "inline" ? (
          <button
            type="button"
            className={`inline-flex items-center gap-1 font-medium text-[var(--home-gold)] underline underline-offset-4 transition hover:text-[var(--home-green)] ${className}`}
          >
            <ShieldAlert className="size-3.5" />
            <span>Refund Disclosure (All Sales Final)</span>
          </button>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
              }
            }}
            className={`group flex cursor-pointer items-start gap-3 rounded-md border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-white p-3.5 text-left transition hover:border-[var(--home-gold)] hover:shadow-sm ${className}`}
          >
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100/80 text-amber-800 transition group-hover:bg-[var(--home-gold)] group-hover:text-white">
              <ShieldAlert className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-bold text-amber-950">
                  All Sales Are Final
                </span>
                <span className="rounded bg-amber-200/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-900">
                  Notice
                </span>
              </div>
              <p className="mt-0.5 text-[12px] leading-snug text-stone-600">
                Orders cannot be refunded or returned.
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[var(--home-gold)] group-hover:text-[var(--home-green)]">
                <span>View Full Disclosure</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[560px] border-[var(--home-border)] bg-[#FAF8F5] p-6 text-[var(--home-green-deep)]">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2 text-[var(--home-gold)]">
            <ShieldAlert className="size-5" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--home-gold)]">
              Store Policy
            </span>
          </div>
          <DialogTitle className="text-[22px] font-bold text-[var(--home-green-deep)]">
            Refund & Purchase Disclosure
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[var(--home-muted)]">
            Please carefully review our sales policy prior to completing your
            purchase.
          </DialogDescription>
        </DialogHeader>

        {/* Highlight Banner */}
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-800" />
            <div>
              <h4 className="text-[14px] font-bold text-amber-950">
                All Sales Are Final
              </h4>
              <p className="mt-1 text-[12px] leading-relaxed text-amber-900/90">
                Due to the independent, creator-direct nature of our marketplace
                and the instant delivery of digital media, Wonder Emporium
                cannot accept returns or process refunds once an order has been
                placed.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Details Grid */}
        <div className="space-y-3.5 text-[13px]">
          <div className="flex items-start gap-3 rounded-md border border-[var(--home-border)] bg-white p-3.5 shadow-xs">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-700">
              <BookOpen className="size-3.5" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">
                Instant Digital Content
              </p>
              <p className="mt-0.5 text-stone-600 text-[12px] leading-relaxed">
                eBooks, audiobooks, and digital downloads are automatically
                delivered to your account library immediately after purchase. As
                these digital files cannot be recalled, all digital sales are
                strictly non-refundable.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-md border border-[var(--home-border)] bg-white p-3.5 shadow-xs">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-700">
              <PackageX className="size-3.5" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">
                Physical Editions & Shipping
              </p>
              <p className="mt-0.5 text-stone-600 text-[12px] leading-relaxed">
                Physical book orders and special author editions are fulfilled
                promptly. Please double check your chosen book format, quantity,
                and shipping address before finalizing your checkout.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-md border border-[var(--home-border)] bg-white p-3.5 shadow-xs">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="size-3.5" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">
                Damaged or Defective Items Guarantee
              </p>
              <p className="mt-0.5 text-stone-600 text-[12px] leading-relaxed">
                While we cannot accept buyer-remorse refunds, if your physical
                book arrives damaged, misprinted, or defective, please contact
                us within 48 hours of delivery with photos of the issue for a
                replacement.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-md border border-[var(--home-border)] bg-white p-3.5 shadow-xs">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded bg-amber-100 text-amber-800">
              <Sparkles className="size-3.5" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">
                Supporting Independent Authors
              </p>
              <p className="mt-0.5 text-stone-600 text-[12px] leading-relaxed">
                Your purchase directly rewards and supports independent writers
                and creators. We appreciate your understanding and commitment to
                fair creative commerce!
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2 border-t border-[var(--home-border)] pt-4 sm:justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-11 w-full sm:w-auto items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
          >
            I Understand
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
