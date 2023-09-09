import { getCoupon, type GetCouponResponse } from "@/modules/services/coupons";
import { useQuery } from "@tanstack/react-query";

export type Coupon = GetCouponResponse;

const useCouponById = (couponId: string) => {
  return useQuery({
    queryKey: ["useCouponById", couponId],
    queryFn: () =>
      getCoupon({
        id: couponId,
      }),
    enabled: !!couponId,
  });
};

export default useCouponById;
