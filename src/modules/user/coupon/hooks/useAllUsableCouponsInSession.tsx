import { getAllUsableCouponsInSession } from "@/modules/services/sessions";
import { useSessionStore } from "@/modules/user/order/hooks/useSessionStore";
import { useQuery } from "@tanstack/react-query";

export const useAllUsableCouponsInSession = () => {
  const session = useSessionStore((state) => state.session);

  const { data, refetch } = useQuery({
    queryKey: ["getAllUsableCouponsInSession", session?._id],
    queryFn: () => getAllUsableCouponsInSession({ id: session?._id || "" }),
    retry: false,
    enabled: !!session,
  });

  return { data, refetch };
};
