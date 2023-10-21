import { H3 } from "@/modules/common/components/Typography";
import { type GetReportNetIncomeGroupedResponse } from "@/modules/services/dashboard";
import { Column } from "@ant-design/plots";
import { Card } from "antd";
import React from "react";

type DayInWeekProps = {
  data?: GetReportNetIncomeGroupedResponse["daysOfWeek"];
};

const dayEngToThai: Record<
  keyof GetReportNetIncomeGroupedResponse["daysOfWeek"],
  string
> = {
  Sun: "อา.",
  Mon: "จ.",
  Tue: "อ.",
  Wed: "พ.",
  Thu: "พฤ.",
  Fri: "ศ.",
  Sat: "ส.",
};

const DayInWeek: React.FC<DayInWeekProps> = ({ data }) => {
  const formatData = Object.entries(data || {}).map(([day, netIncome]) => ({
    วัน: dayEngToThai[
      day as keyof GetReportNetIncomeGroupedResponse["daysOfWeek"]
    ],
    รายรับ: netIncome,
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
      <H3>รายรับในสัปดาห์</H3>
      <Column data={formatData} xField="วัน" yField="รายรับ" />
    </Card>
  );
};

export default DayInWeek;
