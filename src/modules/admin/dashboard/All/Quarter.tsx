import { H3 } from "@/modules/common/components/Typography";
import { type GetReportNetIncomeGroupedResponse } from "@/modules/services/dashboard";
import { Column } from "@ant-design/plots";
import { Card } from "antd";

type QuarterProps = {
  data?: GetReportNetIncomeGroupedResponse["quarterly"];
};

const Quarter = ({ data }: QuarterProps) => {
  const formatData = Object.entries(data || {}).map(([quarter, netIncome]) => ({
    ไตรมาส: quarter,
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
      <H3>รายรับแต่ละไตรมาส</H3>
      <Column data={formatData} xField="ไตรมาส" yField="รายรับ" />
    </Card>
  );
};

export default Quarter;
