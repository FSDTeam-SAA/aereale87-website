import { useQuery } from "@tanstack/react-query";

import { getUserOrders } from "../api/orders.api";

export function useOrdersData() {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: getUserOrders,
  });
}
