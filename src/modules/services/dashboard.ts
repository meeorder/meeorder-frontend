import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> get sales report <<<<========================================//

export type GetSalesReportQueryParams =
  paths["/dashboard/sales_report"]["get"]["parameters"]["query"];
export type GetSalesReportResponse =
  paths["/dashboard/sales_report"]["get"]["responses"]["200"]["content"]["application/json"];

export const getSalesReport = async (
  params: GetSalesReportQueryParams,
): Promise<GetSalesReportResponse> => {
  const { data } = await axiosInstance.get<GetSalesReportResponse>(
    "/dashboard/sales_report",
    {
      params,
    },
  );
  return data;
};
