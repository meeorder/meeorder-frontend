import {
  getAllOrders,
  type GetAllOrdersResponse,
} from "@/modules/services/orders";
import { useQuery } from "@tanstack/react-query";

export type AllOrdersData = GetAllOrdersResponse;

const useAllOrders = () => {
  return useQuery({
    queryKey: ["useAllOrders"],
    queryFn: getAllOrders,
  });
};

export default useAllOrders;
