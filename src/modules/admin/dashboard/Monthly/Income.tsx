import { useIncomeReport30Days } from "@/modules/admin/dashboard/Monthly/hooks";
import { H2, Text } from "@/modules/common/components/Typography";
import { Line } from "@ant-design/plots";
import { Card } from "antd";
import { useEffect, useState } from "react";

const Income = () => {
  const { data } = useIncomeReport30Days();
  const processedData = data?.map((d) => ({
    วันที่: new Date(d.date).toLocaleDateString("th-TH", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    }),
    รายรับ: d.net_income,
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
        marginTop: "-24px",
      }}
    >
      <div style={{ display: "flex", gap: "4px", alignItems: "baseline" }}>
        <H2>รายรับ</H2>
        <Text type="secondary">( 30 วันย้อนหลัง )</Text>
      </div>
      <Line
        data={processedData || []}
        xField="วันที่"
        yField="รายรับ"
        width={100}
        key={key}
      />
    </Card>
  );
};

export default Income;
