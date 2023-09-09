import {
  getAllCoupons,
  type GetAllCouponsResponse,
} from "@/modules/services/coupons";
import { useQuery } from "@tanstack/react-query";

export type AllCouponsData = GetAllCouponsResponse;

const useAllCoupon = () => {
  return useQuery({
    queryKey: ["useAllCoupon"],
    queryFn: () => getAllCoupons(),
  });
};

export default useAllCoupon;
