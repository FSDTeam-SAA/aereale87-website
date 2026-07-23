import { api } from "@/lib/api";

export type ApiCartItem = {
  id: string;
  cartId: string;
  bookId: string;
  formatId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiCart = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: ApiCartItem[];
};

type ApiEnvelope<T> = {
  data?: T;
  message?: string;
  statusCode?: number;
};

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  return payload && typeof payload === "object" && "data" in payload
    ? ((payload as ApiEnvelope<T>).data as T)
    : (payload as T);
}

export async function getCart() {
  const response = await api.get<ApiEnvelope<ApiCart> | ApiCart>("/cart");
  return unwrap(response.data);
}

export async function addCartItem(input: {
  bookId: string;
  formatId: string;
  quantity?: number;
}) {
  const response = await api.post<ApiEnvelope<ApiCart> | ApiCart>(
    "/cart/items",
    input,
  );
  return unwrap(response.data);
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const response = await api.patch<ApiEnvelope<ApiCart> | ApiCart>(
    `/cart/items/${itemId}`,
    {
      quantity,
    },
  );
  return unwrap(response.data);
}

export async function removeCartItem(itemId: string) {
  const response = await api.delete<ApiEnvelope<ApiCart> | ApiCart>(
    `/cart/items/${itemId}`,
  );
  return unwrap(response.data);
}

export async function clearCart() {
  await api.delete("/cart");
}
