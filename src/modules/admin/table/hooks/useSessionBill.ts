import {
  getOrdersBySessionId,
  getSessionByTableId,
} from "@/modules/services/sessions";
import { useQuery } from "@tanstack/react-query";

const useGetSessionByTableId = (tableId: string) =>
  useQuery({
    queryKey: ["useSessionByTableId", tableId],
    queryFn: () => getSessionByTableId({ id: tableId }),
  });

const useGetOrdersByTableId = (tableId: string) => {
  const { data } = useGetSessionByTableId(tableId);
  // TODO Change to get by table id
  return {
    ...useQuery({
      queryKey: ["useOrdersByTableId", data?._id],
      queryFn: () => getOrdersBySessionId({ id: data?._id ?? "" }),
      refetchInterval: 5000,
    }),
    sessionId: data?._id,
  };
};

export { useGetOrdersByTableId };
