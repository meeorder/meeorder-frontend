import {
  useDailyIncome,
  useMonthlyIncome,
  useYearlyIncome,
} from "@/modules/admin/dashboard/All/hooks";
import { H2 } from "@/modules/common/components/Typography";
import { Column } from "@ant-design/plots";
import { Card, Segmented } from "antd";
import "dayjs/locale/th";
import { useState } from "react";

const AllTimeIncome = () => {
  const [option, setOption] = useState<"วัน" | "เดือน" | "ปี">("วัน");

  const { data: dailyIncome } = useDailyIncome();
  const { data: monthlyIncome } = useMonthlyIncome();
  const { data: yearlyIncome } = useYearlyIncome();

  const formatDailyIncome = dailyIncome
    ?.sort((a, b) => (a.date > b.date ? 1 : -1))
    ?.map((income) => ({
      ...income,
      date: new Date(income.date).toLocaleDateString("th-TH", {
        year: "2-digit",
        month: "short",
        day: "numeric",
      }),
      รายได้สุทธิ: income.netIncome,
    }));

  const formatMonthlyIncome = monthlyIncome
    ?.sort((a, b) => (a.month > b.month ? 1 : -1))
    ?.map((income) => ({
      ...income,
      month: new Date(income.month).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
      }),
      รายได้สุทธิ: income.netIncome,
    }));

  const formatYearlyIncome = yearlyIncome
    ?.sort((a, b) => (a.year > b.year ? 1 : -1))
    ?.map((income) => ({
      ...income,
      year: new Date(income.year).toLocaleDateString("th-TH", {
        year: "numeric",
      }),
      รายได้สุทธิ: income.netIncome,
    }));

  return (
    <Card
      bodyStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        marginTop: "-24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H2>รายรับทั้งหมด</H2>

        <Segmented
          options={["วัน", "เดือน", "ปี"]}
          value={option}
          onChange={(value) => setOption(value as "วัน" | "เดือน" | "ปี")}
        />
      </div>
      <Column
        data={
          option === "วัน"
            ? formatDailyIncome || []
            : option === "เดือน"
            ? formatMonthlyIncome || []
            : formatYearlyIncome || []
        }
        xField={
          option === "วัน" ? "date" : option === "เดือน" ? "month" : "year"
        }
        yField="รายได้สุทธิ"
        slider={{
          start: 0,
          end: 1,
        }}
      />
    </Card>
  );
};

export default AllTimeIncome;
