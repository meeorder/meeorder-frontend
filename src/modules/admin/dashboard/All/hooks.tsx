import {
  getAllDailyNetIncome,
  getAllMonthlyNetIncome,
  getAllYearlyNetIncome,
  getReportNetIncomeGrouped,
} from "@/modules/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDailyIncome = () =>
  useQuery({
    queryKey: ["getDailyIncome"],
    queryFn: () => getAllDailyNetIncome(),
  });

export const useMonthlyIncome = () =>
  useQuery({
    queryKey: ["getMonthlyIncome"],
    queryFn: () => getAllMonthlyNetIncome(),
  });

export const useYearlyIncome = () =>
  useQuery({
    queryKey: ["getYearlyIncome"],
    queryFn: () => getAllYearlyNetIncome(),
  });

export const useReportNetIncomeGrouped = (startTime: number, endTime: number) =>
  useQuery({
    queryKey: ["getReportNetIncomeGrouped", startTime, endTime],
    queryFn: () =>
      getReportNetIncomeGrouped({
        startTime,
        endTime,
      }),
  });
