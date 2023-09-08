import {
  getCouponById,
  type GetCouponByIdResponse,
} from "@/modules/services/coupon";
import { useQuery } from "@tanstack/react-query";

export type Coupon = GetCouponByIdResponse;

const useCouponById = (couponId: string) => {
  return useQuery({
    queryKey: ["useCouponById", couponId],
    queryFn: () =>
      getCouponById({
        id: couponId,
      }),
    enabled: !!couponId,
  });
};

export default useCouponById;
