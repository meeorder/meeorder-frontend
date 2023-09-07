import {
  getOrdersBySessionId,
  type GetOrdersBySessionIdResponse,
} from "@/modules/services/orders";
import { useQuery } from "@tanstack/react-query";

export type OrdersWithPriceData = GetOrdersBySessionIdResponse;

const useOrder = (sessionId: string) => {
  return useQuery({
    queryKey: ["getOrdersBySessionId", sessionId],
    queryFn: () =>
      getOrdersBySessionId({
        id: sessionId,
      }),
  });
};

export default useOrder;
