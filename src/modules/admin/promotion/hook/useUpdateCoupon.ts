import { updateCoupon } from "@/modules/services/coupons";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateCoupon = () => {
  return useMutation({
    mutationFn: updateCoupon,
    mutationKey: ["useUpdateCoupon"],
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllCoupon"]);
    },
  });
};

export default useUpdateCoupon;
