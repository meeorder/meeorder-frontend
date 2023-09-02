import { getOrdersBySessionId } from "@/modules/services/orders";
import { useQuery } from "@tanstack/react-query";

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
