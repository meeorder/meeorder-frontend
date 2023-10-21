import { setOrderStatusToCancelById } from "@/modules/services/orders";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateOrderStatusToCancel = () => {
  return useMutation({
    mutationKey: ["useUpdateOrderStatusToCancel"],
    mutationFn: setOrderStatusToCancelById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllOrders"]);
    },
  });
};

export default useUpdateOrderStatusToCancel;
