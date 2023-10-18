import { H3 } from "@/modules/common/components/Typography";
import { Column } from "@ant-design/plots";
import { Card } from "antd";

const DayInWeek = () => {
  const data = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((i) => ({
    วัน: i,
    รายรับ: Math.round((Math.random() - 0.5) * 10000) + 10000,
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
      <Column data={data} xField="วัน" yField="รายรับ" />
    </Card>
  );
};

export default DayInWeek;
