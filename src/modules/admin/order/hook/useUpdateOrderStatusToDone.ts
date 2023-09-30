import { setOrderStatusToDoneById } from "@/modules/services/orders";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateOrderStatusToDone = () => {
  return useMutation({
    mutationKey: ["useUpadateOrderStatusToDone"],
    mutationFn: setOrderStatusToDoneById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllOrders"]);
    },
  });
};
export default useUpdateOrderStatusToDone;
