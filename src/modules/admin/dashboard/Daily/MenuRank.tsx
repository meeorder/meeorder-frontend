import CardTitle from "@/modules/admin/dashboard/Daily/CardTitle";
import { useSalesToday } from "@/modules/admin/dashboard/Daily/hooks";
import { Pie } from "@ant-design/plots";
import { AlignBottom } from "@phosphor-icons/react";
import { Card, Empty, Segmented } from "antd";
import { useEffect, useState } from "react";

const MenuRank = () => {
  const [option, setOption] = useState<"จำนวนที่ขายได้" | "ยอดขาย">(
    "จำนวนที่ขายได้",
  );

  const { data } = useSalesToday();

  const processedData =
    data
      ?.sort((a, b) => {
        if (option === "จำนวนที่ขายได้") {
          return b.total_amount - a.total_amount;
        } else {
          return b.total_price - a.total_price;
        }
      })
      ?.slice(0, 5) || [];

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
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardTitle Icon={AlignBottom} title="5 อันดับเมนูที่ขายดีที่สุด" />
        <Segmented
          options={["จำนวนที่ขายได้", "ยอดขาย"]}
          value={option}
          onChange={(value) => setOption(value as "จำนวนที่ขายได้" | "ยอดขาย")}
        />
      </div>
      {processedData.length === 0 ? (
        <Empty
          description="มีข้อมูลไม่เพียงพอ"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <Pie
          key={key}
          appendPadding={10}
          data={processedData}
          label={{
            type: "outer",
          }}
          interactions={[
            {
              type: "element-active",
            },
          ]}
          angleField={
            option === "จำนวนที่ขายได้" ? "total_amount" : "total_price"
          }
          colorField="title"
        />
      )}
    </Card>
  );
};

export default MenuRank;
