import {
  getAllSalesReport,
  getIncomePerReceiptToday,
  getNetIncomeAndDiscountToday,
  getTotalCouponUsageToday,
  getTotalReceiptAmountToday,
} from "@/modules/services/dashboard";
import { useQuery } from "@tanstack/react-query";

const getStartOfDay = () => {
  const startOfDay = Math.floor(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ).valueOf() / 1000,
  );
  return startOfDay;
};

export const useTotalReceiptAmountToday = () =>
  useQuery({
    queryKey: ["getTotalReceiptAmountToday"],
    queryFn: () => getTotalReceiptAmountToday({ date: getStartOfDay() }),
  });

export const useNetIncomeAndDiscountToday = () =>
  useQuery({
    queryKey: ["getNetIncomeAndDiscountToday"],
    queryFn: () =>
      getNetIncomeAndDiscountToday({
        date: getStartOfDay(),
      }),
  });

export const useTotalCouponUsageToday = () =>
  useQuery({
    queryKey: ["getTotalCouponUsageToday"],
    queryFn: () =>
      getTotalCouponUsageToday({
        date: getStartOfDay(),
      }),
  });

export const useIncomePerReceiptToday = () =>
  useQuery({
    queryKey: ["getIncomePerReceiptToday"],
    queryFn: () =>
      getIncomePerReceiptToday({
        date: getStartOfDay(),
      }),
  });

export const useSalesToday = () =>
  useQuery({
    queryKey: ["getSalesToday"],
    queryFn: () =>
      getAllSalesReport({
        startTime: getStartOfDay(),
        endTime: getStartOfDay() + 86400, // 86400 = 1 day
      }),
  });
