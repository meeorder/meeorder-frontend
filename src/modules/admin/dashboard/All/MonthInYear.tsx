import { H3 } from "@/modules/common/components/Typography";
import { Column } from "@ant-design/plots";
import { Card } from "antd";

const MonthInYear = () => {
  const data = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ].map((i) => ({
    เดือน: i,
    รายรับ: Math.round((Math.random() - 0.5) * 30000) + 30000,
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
      <Column data={data} xField="เดือน" yField="รายรับ" />
    </Card>
  );
};

export default MonthInYear;
