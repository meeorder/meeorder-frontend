import { DeleteOrderById } from "@/modules/services/orders";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useDeleteOrder = () => {
  return useMutation({
    mutationKey: ["useDeleteOrder"],
    mutationFn: DeleteOrderById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllOrders"]);
    },
  });
};

export default useDeleteOrder;
