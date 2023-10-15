import { setOrderStatusToPreparingById } from "@/modules/services/orders";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateOrderStatusToPreparing = () => {
  return useMutation({
    mutationKey: ["useUpadateOrderStatusToPreparing"],
    mutationFn: setOrderStatusToPreparingById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllOrders"]);
    },
  });
};
export default useUpdateOrderStatusToPreparing;
