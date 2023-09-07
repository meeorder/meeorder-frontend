import {
  createCoupon,
  type CreateCouponBodyParam,
} from "@/modules/services/coupon";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
const useCreateCoupon = () => {
  return useMutation({
    mutationFn: ({
      title,
      description,
      required_menus,
      required_point,
      activated,
      discount,
      quota,
      image,
      redeemed,
    }: CreateCouponBodyParam) =>
      createCoupon({
        title,
        description,
        required_menus,
        required_point,
        activated,
        discount,
        quota,
        image,
        redeemed,
      }),
    mutationKey: ["useCreateCoupon"],
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllCoupon"]);
    },
  });
};

export default useCreateCoupon;
