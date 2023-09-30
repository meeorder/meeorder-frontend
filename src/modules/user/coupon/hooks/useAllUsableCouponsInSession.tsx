import { getAllUsableCouponsInSession } from "@/modules/services/sessions";
import { useSessionIdStore } from "@/modules/user/order/hooks/useSession";
import { useQuery } from "@tanstack/react-query";

export const useAllUsableCouponsInSession = () => {
  const sessionId = useSessionIdStore((state) => state.sessionId);

  return useQuery({
    queryKey: ["getAllUsableCouponsInSession", sessionId],
    queryFn: () => getAllUsableCouponsInSession({ id: sessionId ?? "" }),
    retry: false,
    enabled: !!sessionId,
  });
};
