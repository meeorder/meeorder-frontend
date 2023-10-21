import {
  getSalesReport,
  type GetSalesReportQueryParams,
  type GetSalesReportResponse,
} from "@/modules/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export type salesReport = GetSalesReportResponse;

export const useSalesReport = (params: GetSalesReportQueryParams) => {
  return useQuery({
    queryKey: ["salesReport", params],
    queryFn: () => getSalesReport(params),
  });
};
