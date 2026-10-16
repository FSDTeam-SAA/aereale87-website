import { api } from "@/lib/api";

import type { UserOrdersData } from "../types/orders.types";

type ApiEnvelope<T> = {
  data?: T;
};

type BackendOrderItem = {
  id: string;
  quantity: number;
  unitPrice?: number;
  totalPrice: number;
  book?: {
    id?: string;
    title: string;
    bookCover: string | null;
    category?: string | null;
    author?: {
      username?: string;
      userProfile?: {
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    } | null;
  } | null;
  format?: {
    formatType: string;
    listPrice?: number;
  } | null;
};

type BackendOrder = {
  id: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  currency?: string;
  subtotal?: number;
  taxAmount?: number;
  totalAmount: number;
  createdAt: string;
  items?: BackendOrderItem[];
};

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  return payload && typeof payload === "object" && "data" in payload
    ? ((payload as ApiEnvelope<T>).data as T)
    : (payload as T);
}

function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function getAuthorDisplayName(
  author?: BackendOrderItem["book"] extends infer B
    ? B extends { author?: infer A }
      ? A
      : never
    : never,
) {
  if (!author) return "";
  const profile = author.userProfile;
  if (profile?.firstName || profile?.lastName) {
    return [profile.firstName, profile.lastName].filter(Boolean).join(" ");
  }
  return author.username || "";
}

export async function getUserOrders(): Promise<UserOrdersData> {
  const response = await api.get<ApiEnvelope<BackendOrder[]> | BackendOrder[]>(
    "/orders/history",
  );
  const orders = unwrap(response.data) || [];

  return {
    orders: orders.map((order) => {
      const currency = order.currency || "USD";
      const items = (order.items || []).map((item) => {
        const authorName = getAuthorDisplayName(item.book?.author);
        const unitPriceNum =
          item.unitPrice ??
          (item.quantity > 0
            ? item.totalPrice / item.quantity
            : item.totalPrice);

        return {
          id: item.id,
          bookId: item.book?.id,
          title: item.book?.title || "Book",
          authorName: authorName || undefined,
          category: item.book?.category || undefined,
          format: item.format?.formatType || "Standard",
          unitPrice: formatCurrency(unitPriceNum, currency),
          quantity: item.quantity,
          totalPrice: formatCurrency(item.totalPrice, currency),
          cover: item.book?.bookCover || "/no-image.jpg",
        };
      });

      const totalItemsCount = items.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );

      const subtotalNum =
        order.subtotal ?? order.totalAmount - (order.taxAmount ?? 0);
      const taxNum = order.taxAmount ?? 0;

      return {
        id: order.id,
        status: order.status,
        subtotal: formatCurrency(subtotalNum, currency),
        taxAmount: formatCurrency(taxNum, currency),
        totalAmount: formatCurrency(order.totalAmount, currency),
        currency,
        createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
        rawCreatedAt: order.createdAt,
        itemCount: totalItemsCount,
        items,
      };
    }),
  };
}
