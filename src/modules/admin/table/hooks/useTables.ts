import { useSelectedTableStore } from "@/modules/admin/table/hooks/useSelectedTableStore";
import {
  createTable,
  getAllTables,
  type CreateTableBodyParam,
} from "@/modules/services/tables";
import { queryClient } from "@/pages/_app";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllTable = () => {
  return useQuery({
    queryKey: ["useAllTable"],
    queryFn: () => getAllTables(),
    refetchInterval: 5000,
  });
};

export const useCreateTable = () => {
  const { setTableId } = useSelectedTableStore();
  return useMutation({
    mutationFn: (params: CreateTableBodyParam) => createTable(params),
    onSuccess: (x) => {
      void queryClient.invalidateQueries(["useAllTable"]);
      setTableId(x._id);
    },
  });
};
