import { useSelectedTableStore } from "@/modules/admin/table/hooks/useSelectedTableStore";
import {
  createSession,
  setSessionFinishById,
} from "@/modules/services/sessions";
import { getTableById } from "@/modules/services/tables";
import { queryClient } from "@/pages/_app";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetOrdersByTableId = (tableId: string) => {
  return {
    ...useQuery({
      queryKey: ["useOrdersByTableId", tableId],
      queryFn: () => getTableById({ id: tableId }),
      refetchInterval: 10000,
    }),
  };
};
const useFinishSession = (tableId: string) => {
  return useMutation({
    mutationFn: (sessionId: string) => setSessionFinishById({ id: sessionId }),
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllTable"]);
      void queryClient.invalidateQueries(["useOrdersByTableId", tableId]);
    },
  });
};

const useCreateNewSession = () => {
  const { setTableId } = useSelectedTableStore();
  return useMutation({
    mutationFn: (tableId: string) => createSession({ table: tableId }),
    onSuccess: (res) => {
      void queryClient.invalidateQueries(["useOrdersByTableId", res.table]);
      void queryClient.invalidateQueries(["useAllTable"]);
      setTableId(res.table);
    },
  });
};

export { useCreateNewSession, useFinishSession, useGetOrdersByTableId };
