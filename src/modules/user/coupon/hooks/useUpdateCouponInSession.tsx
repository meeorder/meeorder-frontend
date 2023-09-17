import { updateCouponInSession } from "@/modules/services/sessions";
import { useSessionIdStore } from "@/modules/user/order/hooks/useSession";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCouponInSession = () => {
  const sessionId = useSessionIdStore((state) => state.sessionId);

  const { mutate } = useMutation({
    mutationKey: ["updateCouponInSession"],
    mutationFn: (payload: { coupon_id: string | null }) =>
      updateCouponInSession({
        id: sessionId || "",
        coupon_id: payload.coupon_id,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries(["getSessionById"]);
    },
  });

  return { mutate };
};
