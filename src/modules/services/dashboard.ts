import { axiosInstance } from "@/modules/services/axios";
import { type paths } from "@/schemas/schema";

//================>>>> Get total receipt amount Today <<<<==================================//
export type GetTotalReceiptAmountTodayQueryParams =
  paths["/dashboard/receipt_report"]["get"]["parameters"]["query"];
export type GetTotalReceiptAmountTodayResponse =
  paths["/dashboard/receipt_report"]["get"]["responses"]["200"]["content"]["application/json"];

export const getTotalReceiptAmountToday = async (
  params: GetTotalReceiptAmountTodayQueryParams,
): Promise<GetTotalReceiptAmountTodayResponse> => {
  const { data } = await axiosInstance.get<GetTotalReceiptAmountTodayResponse>(
    "/dashboard/receipt_report",
    { params },
  );
  return data;
};

//================>>>> Get net income & discount Today <<<<==================================//
export type GetNetIncomeAndDiscountTodayQueryParams =
  paths["/dashboard/incomes_report"]["get"]["parameters"]["query"];
export type GetNetIncomeAndDiscountTodayResponse =
  paths["/dashboard/incomes_report"]["get"]["responses"]["200"]["content"]["application/json"];

export const getNetIncomeAndDiscountToday = async (
  params: GetNetIncomeAndDiscountTodayQueryParams,
): Promise<GetNetIncomeAndDiscountTodayResponse> => {
  const { data } =
    await axiosInstance.get<GetNetIncomeAndDiscountTodayResponse>(
      "/dashboard/incomes_report",
      { params },
    );
  return data;
};

//================>>>> Get total coupon usage Today <<<<==================================//
export type GetTotalCouponUsageTodayQueryParams =
  paths["/dashboard/coupon_report"]["get"]["parameters"]["query"];
export type GetTotalCouponUsageTodayResponse =
  paths["/dashboard/coupon_report"]["get"]["responses"]["200"]["content"]["application/json"];

export const getTotalCouponUsageToday = async (
  params: GetTotalCouponUsageTodayQueryParams,
): Promise<GetTotalCouponUsageTodayResponse> => {
  const { data } = await axiosInstance.get<GetTotalCouponUsageTodayResponse>(
    "/dashboard/coupon_report",
    { params },
  );
  return data;
};

//================>>>> Get income per receipt Today <<<<==================================//
export type GetIncomePerReceiptTodayQueryParams =
  paths["/dashboard/income_per_receipt"]["get"]["parameters"]["query"];
export type GetIncomePerReceiptTodayResponse =
  paths["/dashboard/income_per_receipt"]["get"]["responses"]["200"]["content"]["application/json"];

export const getIncomePerReceiptToday = async (
  params: GetIncomePerReceiptTodayQueryParams,
): Promise<GetIncomePerReceiptTodayResponse> => {
  const { data } = await axiosInstance.get<GetIncomePerReceiptTodayResponse>(
    "/dashboard/income_per_receipt",
    { params },
  );
  return data;
};

//================>>>> Get all sales report from stan date to end date <<<<==================================//
export type GetAllSalesReportQueryParams =
  paths["/dashboard/sales_report"]["get"]["parameters"]["query"];
export type GetAllSalesReportResponse =
  paths["/dashboard/sales_report"]["get"]["responses"]["200"]["content"]["application/json"];

export const getAllSalesReport = async (
  params: GetAllSalesReportQueryParams,
): Promise<GetAllSalesReportResponse> => {
  const { data } = await axiosInstance.get<GetAllSalesReportResponse>(
    "/dashboard/sales_report",
    { params },
  );
  return data;
};

//================>>>> Get all daily net income <<<<==================================//
export type GetAllDailyNetIncomeResponse =
  paths["/dashboard/net_income/chart_data/daily"]["get"]["responses"]["200"]["content"]["application/json"][]; //todo: fix type

export const getAllDailyNetIncome =
  async (): Promise<GetAllDailyNetIncomeResponse> => {
    const { data } = await axiosInstance.get<GetAllDailyNetIncomeResponse>(
      "/dashboard/net_income/chart_data/daily",
    );
    return data;
  };

//================>>>> Get all monthly net income <<<<==================================//
export type GetAllMonthlyNetIncomeResponse =
  paths["/dashboard/net_income/chart_data/monthly"]["get"]["responses"]["200"]["content"]["application/json"][]; //todo: fix type

export const getAllMonthlyNetIncome =
  async (): Promise<GetAllMonthlyNetIncomeResponse> => {
    const { data } = await axiosInstance.get<GetAllMonthlyNetIncomeResponse>(
      "/dashboard/net_income/chart_data/monthly",
    );
    return data;
  };

//================>>>> Get all yearly net income <<<<==================================//
export type GetAllYearlyNetIncomeResponse =
  paths["/dashboard/net_income/chart_data/yearly"]["get"]["responses"]["200"]["content"]["application/json"][]; //todo: fix type

export const getAllYearlyNetIncome =
  async (): Promise<GetAllYearlyNetIncomeResponse> => {
    const { data } = await axiosInstance.get<GetAllYearlyNetIncomeResponse>(
      "/dashboard/net_income/chart_data/yearly",
    );
    return data;
  };

//================>>>> Get report net income grouped by hour, day of week, month, quarter <<<<===============//
export type GetReportNetIncomeGroupedQueryParams =
  paths["/dashboard/net_income/chart_group"]["get"]["parameters"]["query"];
export type GetReportNetIncomeGroupedResponse =
  paths["/dashboard/net_income/chart_group"]["get"]["responses"]["200"]["content"]["application/json"];

export const getReportNetIncomeGrouped = async (
  params: GetReportNetIncomeGroupedQueryParams,
): Promise<GetReportNetIncomeGroupedResponse> => {
  const { data } = await axiosInstance.get<GetReportNetIncomeGroupedResponse>(
    "/dashboard/net_income/chart_group",
    { params },
  );
  return data;
};
