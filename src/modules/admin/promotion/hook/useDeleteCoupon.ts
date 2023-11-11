import { deleteCoupon } from "@/modules/services/coupons";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useDeleteCoupon = () => {
  return useMutation({
    mutationFn: deleteCoupon,
    mutationKey: ["useDeleteCoupon"],
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllCoupon"]);
    },
  });
};

export default useDeleteCoupon;
