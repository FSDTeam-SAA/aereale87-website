"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { SiteHeader } from "@/components/shared/site/SiteHeader";
import { api } from "@/lib/api";

type OrderHistoryItem = {
  id: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  totalAmount: number;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    totalPrice: number;
    book: {
      title: string;
    };
    format: {
      formatType: string;
    };
  }>;
};

type OrderHistoryResponse = {
  data?: OrderHistoryItem[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function CheckoutStatusPage({ mode }: { mode: "success" | "cancel" }) {
  const { status } = useSession();
  const historyQuery = useQuery({
    queryKey: ["order-history"],
    queryFn: async () => {
      const response = await api.get<OrderHistoryResponse>("/orders/history");
      return response.data.data ?? [];
    },
    enabled: status === "authenticated",
    refetchInterval: (query) => {
      const latest = query.state.data?.[0];
      return latest?.status === "PENDING" && mode === "success" ? 3000 : false;
    },
  });

  const latestOrder = historyQuery.data?.[0];

  return (
    <main className="min-h-screen bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/cart" />
      <section className="px-5 py-16 sm:px-8 lg:px-[120px]">
        <div className="mx-auto max-w-[900px] border border-[var(--home-border)] bg-white p-8 lg:p-12">
          <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[var(--home-gold)]">
            Payment Status
          </p>
          <h1 className="mt-4 text-[40px] font-bold leading-[1.1]">
            {mode === "success"
              ? "Thanks, we’re checking your payment."
              : "Checkout was canceled."}
          </h1>
          <p className="mt-4 max-w-[700px] text-[18px] text-[var(--home-muted)]">
            {mode === "success"
              ? "Stripe may redirect back before the webhook finishes. This page reads your real order history and will refresh while the order is still pending."
              : "Your cart is still available. No payment is considered complete unless order history shows it after webhook processing."}
          </p>

          {status !== "authenticated" ? (
            <p className="mt-8 text-sm text-[var(--home-muted)]">
              Sign in to check your live order status.
            </p>
          ) : null}

          {latestOrder ? (
            <div className="mt-8 border border-[var(--home-border)] bg-[var(--home-paper)] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-[var(--home-muted)]">
                    Latest order
                  </p>
                  <p className="font-mono text-sm">{latestOrder.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--home-muted)]">Status</p>
                  <p className="text-lg font-bold">{latestOrder.status}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--home-muted)]">
                Total: {formatCurrency(latestOrder.totalAmount)}
              </p>
              <div className="mt-5 space-y-3">
                {latestOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-t border-[var(--home-border)] pt-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold">{item.book.title}</p>
                      <p className="text-[var(--home-muted)]">
                        {item.format.formatType} x {item.quantity}
                      </p>
                    </div>
                    <p>{formatCurrency(item.totalPrice)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cart"
              className="inline-flex h-12 items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
            >
              Return to cart
            </Link>
            <Link
              href="/categories?view=shop"
              className="inline-flex h-12 items-center justify-center border border-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
