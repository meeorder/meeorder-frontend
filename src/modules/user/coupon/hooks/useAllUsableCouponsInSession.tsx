import { getAllUsableCouponsInSession } from "@/modules/services/sessions";
import { useSessionIdStore } from "@/modules/user/order/hooks/useSession";
import { useQuery } from "@tanstack/react-query";

type Params = {
  ignoreSession: boolean;
};

export const useAllUsableCouponsInSession = (
  { ignoreSession }: Params = { ignoreSession: false },
) => {
  let sessionId = useSessionIdStore((state) => state.sessionId);
  sessionId = ignoreSession ? "0" : sessionId;

  return useQuery({
    queryKey: ["getAllUsableCouponsInSession", sessionId],
    queryFn: () => getAllUsableCouponsInSession({ id: sessionId ?? "" }),
    retry: false,
    enabled: !!sessionId,
  });
};
