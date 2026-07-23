"use client";

import Image from "next/image";

import { DashboardShell } from "@/features/website/dashboard/component/DashboardShell";

import { useOrdersData } from "../hooks/useOrdersData";

function statusTone(status: string) {
  switch (status) {
    case "COMPLETED":
      return "bg-emerald-100 text-emerald-800";
    case "PENDING":
      return "bg-amber-100 text-amber-800";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "REFUNDED":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function OrdersPage() {
  const ordersQuery = useOrdersData();
  const orders = ordersQuery.data?.orders ?? [];

  return (
    <DashboardShell activeHref="/orders" title="My Orders">
      <section className="space-y-5">
        {ordersQuery.isLoading ? (
          <p className="border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
            Loading your order history...
          </p>
        ) : null}
        {!ordersQuery.isLoading && !orders.length ? (
          <p className="border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
            You have no orders yet.
          </p>
        ) : null}

        {orders.map((order) => (
          <article
            key={order.id}
            className="border border-[var(--home-border)] bg-white p-5"
          >
            <div className="flex flex-col gap-3 border-b border-[var(--home-border)] pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--home-muted)]">
                  Order ID
                </p>
                <p className="font-mono text-sm">{order.id}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--home-muted)]">
                  Placed
                </p>
                <p className="text-sm">{order.createdAt}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--home-muted)]">
                  Total
                </p>
                <p className="text-sm font-bold">{order.totalAmount}</p>
              </div>
              <span
                className={`inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-semibold ${statusTone(order.status)}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[64px_1fr_auto] gap-4"
                >
                  <div className="relative h-20 overflow-hidden bg-[var(--home-paper)]">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--home-green-deep)]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--home-muted)]">
                      {item.format} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">{item.totalPrice}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
