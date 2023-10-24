import {
  getIncomeReportFor30Days,
  getReceiptReportFor30Days,
} from "@/modules/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export const useIncomeReport30Days = () =>
  useQuery({
    queryKey: ["getIncomeReport30Days"],
    queryFn: () =>
      getIncomeReportFor30Days({
        startTime: dayjs().add(-30, "d").unix(),
        endTime: dayjs().unix(),
      }),
  });

export const useReceiptReport30Days = () =>
  useQuery({
    queryKey: ["getReceiptReport30Days"],
    queryFn: () =>
      getReceiptReportFor30Days({
        startTime: dayjs().add(-30, "d").unix(),
        endTime: dayjs().unix(),
      }),
  });
