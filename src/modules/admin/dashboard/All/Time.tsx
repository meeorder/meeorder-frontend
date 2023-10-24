import { H3 } from "@/modules/common/components/Typography";
import { type GetReportNetIncomeGroupedResponse } from "@/modules/services/dashboard";
import { Column } from "@ant-design/plots";
import { Card } from "antd";

type TimeProps = {
  data?: GetReportNetIncomeGroupedResponse["hourly"];
};

const Time: React.FC<TimeProps> = ({ data }) => {
  const formatData = Object.entries(data || {}).map(([hour, netIncome]) => ({
    เวลา: `${hour}`,
    รายรับ: netIncome,
  }));
  return (
    <Card
      bodyStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <H3
        style={{
          marginBottom: "24px",
        }}
      >
        รายรับแต่ละช่วงเวลา
      </H3>
      <Column
        data={formatData}
        xField="เวลา"
        yField="รายรับ"
        style={{ height: "30vh" }}
      />
    </Card>
  );
};

export default Time;
