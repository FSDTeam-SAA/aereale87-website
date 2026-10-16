"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Receipt,
  BookOpen,
  ShoppingBag,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

import { DashboardShell } from "@/features/website/dashboard/component/DashboardShell";
import { useOrdersData } from "../hooks/useOrdersData";
import type { UserOrderRecord } from "../types/orders.types";

function statusBadge(status: string) {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
          <CheckCircle2 className="size-3.5 text-emerald-600" />
          Completed
        </span>
      );
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
          <Clock className="size-3.5 text-amber-600" />
          Processing
        </span>
      );
    case "FAILED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800 ring-1 ring-rose-200">
          <AlertCircle className="size-3.5 text-rose-600" />
          Failed
        </span>
      );
    case "REFUNDED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
          <RotateCcw className="size-3.5 text-slate-600" />
          Refunded
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
          {status}
        </span>
      );
  }
}

function OrderCard({ order }: { order: UserOrderRecord }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <article className="overflow-hidden border border-[var(--home-border)] bg-white shadow-sm transition hover:shadow">
      {/* Header Summary */}
      <div className="border-b border-[var(--home-border)] bg-[var(--home-paper)]/40 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--home-muted)]">
                Order Number
              </p>
              <p className="font-mono text-sm font-semibold text-[var(--home-green-deep)]">
                #{order.id.slice(0, 8).toUpperCase()}
                <span className="hidden sm:inline font-normal text-xs text-stone-400 ml-1">
                  ({order.id})
                </span>
              </p>
            </div>

            <div className="border-l border-stone-200 pl-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--home-muted)] flex items-center gap-1">
                <Calendar className="size-3 text-stone-400" />
                Date Placed
              </p>
              <p className="text-sm font-medium text-stone-800">
                {order.createdAt}
              </p>
            </div>

            <div className="border-l border-stone-200 pl-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--home-muted)] flex items-center gap-1">
                <Package className="size-3 text-stone-400" />
                Items
              </p>
              <p className="text-sm font-medium text-stone-800">
                {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="border-l border-stone-200 pl-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--home-muted)] flex items-center gap-1">
                <CreditCard className="size-3 text-stone-400" />
                Total Paid
              </p>
              <p className="text-base font-bold text-[var(--home-green-deep)]">
                {order.totalAmount}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <div>{statusBadge(order.status)}</div>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
              aria-label={
                isExpanded ? "Collapse order details" : "Expand order details"
              }
            >
              <span>{isExpanded ? "Hide Details" : "View Details"}</span>
              {isExpanded ? (
                <ChevronUp className="size-3.5 text-stone-500" />
              ) : (
                <ChevronDown className="size-3.5 text-stone-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Order Items and Financial Breakdown */}
      {isExpanded && (
        <div className="p-6">
          {/* Purchased Items List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--home-muted)] flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-stone-400" />
              Order Items ({order.items.length})
            </h4>

            <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded border border-stone-200 bg-[var(--home-paper)] sm:size-20">
                      <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-semibold text-stone-900 leading-snug">
                        {item.title}
                      </h5>
                      {item.authorName && (
                        <p className="text-xs text-stone-500">
                          By{" "}
                          <span className="font-medium text-stone-700">
                            {item.authorName}
                          </span>
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-500">
                        <span className="inline-block rounded bg-stone-100 px-2 py-0.5 font-medium text-stone-700">
                          {item.format}
                        </span>
                        {item.category && (
                          <span className="inline-block text-stone-400">
                            • {item.category}
                          </span>
                        )}
                        <span>• Qty: {item.quantity}</span>
                        {item.unitPrice && (
                          <span>• Unit: {item.unitPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-dashed border-stone-100">
                    <p className="text-xs text-stone-400 sm:hidden">
                      Total item price:
                    </p>
                    <p className="font-bold text-stone-900 sm:text-base">
                      {item.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing breakdown summary */}
          <div className="mt-6 pt-5 border-t border-stone-100">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Status Note / Guidance */}
              <div className="space-y-2 text-xs text-stone-500 max-w-sm">
                <p className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Receipt className="size-3.5 text-stone-400" />
                  Order Summary
                </p>
                <p>
                  {order.status === "COMPLETED"
                    ? "Payment has been processed successfully. Digital access is ready, and physical prints are sent to fulfillment."
                    : order.status === "PENDING"
                      ? "Your order is pending confirmation or webhook delivery. Refresh the page shortly."
                      : "If you have any questions regarding this order, our support team is happy to help."}
                </p>
                <div className="pt-1">
                  <Link
                    href={`/contact?topic=orders&orderId=${order.id}`}
                    className="inline-flex items-center gap-1 font-medium text-[var(--home-gold)] hover:underline"
                  >
                    Need help with this order?
                    <ExternalLink className="size-3" />
                  </Link>
                </div>
              </div>

              {/* Totals Table */}
              <div className="w-full md:w-72 bg-stone-50/70 p-4 rounded-lg space-y-2 text-sm border border-stone-100">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-800">
                    {order.subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-stone-800">
                    {order.taxAmount}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-base text-[var(--home-green-deep)]">
                  <span>Total</span>
                  <span>{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export function OrdersPage() {
  const ordersQuery = useOrdersData();
  const orders = ordersQuery.data?.orders ?? [];

  return (
    <DashboardShell activeHref="/orders" title="My Orders">
      <section className="space-y-6">
        {/* Intro Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-[var(--home-border)] bg-white p-5">
          <div>
            <h3 className="text-base font-bold text-[var(--home-green-deep)]">
              Purchase History
            </h3>
            <p className="text-xs text-[var(--home-muted)] mt-0.5">
              Review details, itemized totals, and fulfillment status for all
              your book purchases.
            </p>
          </div>
          <Link
            href="/categories?view=shop"
            className="inline-flex h-9 items-center justify-center gap-1.5 border border-[var(--home-gold)] px-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
          >
            <ShoppingBag className="size-3.5" />
            <span>Browse Bookstore</span>
          </Link>
        </div>

        {/* Loading state */}
        {ordersQuery.isLoading && (
          <div className="flex flex-col items-center justify-center border border-dashed border-[var(--home-border)] bg-white p-12 text-center">
            <div className="size-8 animate-spin rounded-full border-2 border-[var(--home-gold)] border-t-transparent mb-3" />
            <p className="text-sm font-medium text-[var(--home-muted)]">
              Loading your order history...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!ordersQuery.isLoading && !orders.length && (
          <div className="border border-dashed border-[var(--home-border)] bg-white p-12 text-center space-y-4">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <ShoppingBag className="size-6" />
            </div>
            <div>
              <p className="text-base font-bold text-[var(--home-green-deep)]">
                No orders yet
              </p>
              <p className="text-sm text-[var(--home-muted)] mt-1">
                You haven&apos;t placed any book orders yet. Explore our curated
                catalog of enchanting stories.
              </p>
            </div>
            <Link
              href="/categories?view=shop"
              className="inline-flex h-10 items-center justify-center bg-[var(--home-gold)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--home-green)]"
            >
              Explore Bookstore
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!ordersQuery.isLoading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
