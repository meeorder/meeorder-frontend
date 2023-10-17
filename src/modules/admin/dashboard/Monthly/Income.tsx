import { H2, Text } from "@/modules/common/components/Typography";
import { Line } from "@ant-design/plots";
import { Card } from "antd";
import { useEffect, useState } from "react";

const Income = () => {
  const data = [...Array(30).keys()].map((i) => ({
    วันที่: `2021-08-${i + 1}`,
    รายรับ: (Math.random() - 0.5) * 1000 + 1000,
  }));

  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setKey((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Card
      bodyStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div style={{ display: "flex", gap: "4px", alignItems: "baseline" }}>
        <H2>รายรับ</H2>
        <Text type="secondary">( 30 วันย้อนหลัง )</Text>
      </div>
      <Line data={data} xField="วันที่" yField="รายรับ" width={100} key={key} />
    </Card>
  );
};

export default Income;
