import {
  getAllCoupons,
  type GetAllCouponsResponse,
} from "@/modules/services/coupon";
import { useQuery } from "@tanstack/react-query";

export type AllCouponsData = GetAllCouponsResponse;

const useAllCoupon = () => {
  return useQuery({
    queryKey: ["useAllCoupon"],
    queryFn: () => getAllCoupons(),
  });
};

export default useAllCoupon;
