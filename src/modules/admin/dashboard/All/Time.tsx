import { H3 } from "@/modules/common/components/Typography";
import { Column } from "@ant-design/plots";
import { Card } from "antd";

const Time = () => {
  const data = [...Array(24).keys()].map((i) => ({
    เวลา: `${i}:00`,
    รายรับ: Math.round((Math.random() - 0.5) * 1000) + 1000,
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
      <H3>รายรับแต่ละช่วงเวลา</H3>
      <Column data={data} xField="เวลา" yField="รายรับ" />
    </Card>
  );
};

export default Time;
