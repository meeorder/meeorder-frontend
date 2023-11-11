import { setOrderStatusToInQueueById } from "@/modules/services/orders";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateOrderStatusToInQueue = () => {
  return useMutation({
    mutationKey: ["useUpadateOrderStatusToInQueue"],
    mutationFn: setOrderStatusToInQueueById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllOrders"]);
    },
  });
};

export default useUpdateOrderStatusToInQueue;
