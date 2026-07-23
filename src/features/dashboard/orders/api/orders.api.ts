import { api } from "@/lib/api";

import type { UserOrdersData } from "../types/orders.types";

type ApiEnvelope<T> = {
  data?: T;
};

type BackendOrder = {
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
      bookCover: string | null;
    };
    format: {
      formatType: string;
    };
  }>;
};

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  return payload && typeof payload === "object" && "data" in payload
    ? ((payload as ApiEnvelope<T>).data as T)
    : (payload as T);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export async function getUserOrders(): Promise<UserOrdersData> {
  const response = await api.get<ApiEnvelope<BackendOrder[]> | BackendOrder[]>(
    "/orders/history",
  );
  const orders = unwrap(response.data);

  return {
    orders: orders.map((order) => ({
      id: order.id,
      status: order.status,
      totalAmount: formatCurrency(order.totalAmount),
      createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      items: order.items.map((item) => ({
        id: item.id,
        title: item.book.title,
        format: item.format.formatType,
        quantity: item.quantity,
        totalPrice: formatCurrency(item.totalPrice),
        cover: item.book.bookCover || "/no-image.jpg",
      })),
    })),
  };
}
