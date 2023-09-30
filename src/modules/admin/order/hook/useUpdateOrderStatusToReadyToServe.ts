import { setOrderStatusToReadyToServeById } from "@/modules/services/orders";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateOrderStatusToReadyToServe = () => {
  return useMutation({
    mutationKey: ["useUpadateOrderStatusToReadyToServe"],
    mutationFn: setOrderStatusToReadyToServeById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllOrders"]);
    },
  });
};
export default useUpdateOrderStatusToReadyToServe;
