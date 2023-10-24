import {
  getAllSalesReport,
  type GetAllSalesReportQueryParams,
  type GetAllSalesReportResponse,
} from "@/modules/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export type salesReport = GetAllSalesReportResponse;

export const useSalesReport = (params: GetAllSalesReportQueryParams) => {
  return useQuery({
    queryKey: ["salesReport", params],
    queryFn: () => getAllSalesReport(params),
  });
};
