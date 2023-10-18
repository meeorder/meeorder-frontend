import { H3 } from "@/modules/common/components/Typography";
import { Column } from "@ant-design/plots";
import { Card } from "antd";

const Quarter = () => {
  const data = ["ไตรมาส 1", "ไตรมาส 2", "ไตรมาส 3", "ไตรมาส 4"].map((i) => ({
    ไตรมาส: i,
    รายรับ: Math.round((Math.random() - 0.5) * 100000) + 100000,
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
      <Column data={data} xField="ไตรมาส" yField="รายรับ" />
    </Card>
  );
};

export default Quarter;
