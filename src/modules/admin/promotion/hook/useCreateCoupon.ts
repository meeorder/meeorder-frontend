import { createCoupon } from "@/modules/services/coupons";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
const useCreateCoupon = () => {
  return useMutation({
    mutationFn: createCoupon,
    mutationKey: ["useCreateCoupon"],
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllCoupon"]);
    },
  });
};

export default useCreateCoupon;
