import { updateCouponInSession } from "@/modules/services/sessions";
import {
  useSessionStore,
  useSetNewSessionBySessionId,
} from "@/modules/user/order/hooks/useSessionStore";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCouponInSession = () => {
  const { session } = useSessionStore();
  const { refetch } = useSetNewSessionBySessionId(session?._id || "");

  const { mutate } = useMutation({
    mutationKey: ["updateCouponInSession"],
    mutationFn: (payload: { coupon_id: string | null }) =>
      updateCouponInSession({
        id: session?._id || "",
        coupon_id: payload.coupon_id,
      }),
    onSuccess: async () => {
      await refetch();
    },
  });

  return { mutate };
};
