import { H3 } from "@/modules/common/components/Typography";
import { type GetReportNetIncomeGroupedResponse } from "@/modules/services/dashboard";
import { Column } from "@ant-design/plots";
import { Card } from "antd";

type MonthInYearProps = {
  data?: GetReportNetIncomeGroupedResponse["monthly"];
};

const MonthEngToThai: Record<
  keyof GetReportNetIncomeGroupedResponse["monthly"],
  string
> = {
  Jan: "ม.ค.",
  Feb: "ก.พ.",
  Mar: "มี.ค.",
  Apr: "เม.ย.",
  May: "พ.ค.",
  Jun: "มิ.ย.",
  Jul: "ก.ค.",
  Aug: "ส.ค.",
  Sep: "ก.ย.",
  Oct: "ต.ค.",
  Nov: "พ.ย.",
  Dec: "ธ.ค.",
};

const MonthInYear = ({ data }: MonthInYearProps) => {
  const formatData = Object.entries(data || {}).map(([month, netIncome]) => ({
    เดือน:
      MonthEngToThai[
        month as keyof GetReportNetIncomeGroupedResponse["monthly"]
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
      <H3>รายรับแต่ละเดือน</H3>
      <Column data={formatData} xField="เดือน" yField="รายรับ" />
    </Card>
  );
};

export default MonthInYear;
