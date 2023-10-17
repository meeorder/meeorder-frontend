import CardTitle from "@/modules/admin/dashboard/Daily/CardTitle";
import { Pie } from "@ant-design/plots";
import { AlignBottom } from "@phosphor-icons/react";
import { Card, Segmented } from "antd";
import { useEffect, useState } from "react";

const MenuRank = () => {
  const [option, setOption] = useState<"จำนวนที่ขายได้" | "ยอดขาย">(
    "จำนวนที่ขายได้",
  );

  const data = [
    {
      title: "ผัดไทย",
      count: 27,
      income: 270,
    },
    {
      title: "กะเพรา",
      count: 23,
      income: 2300 / 2,
    },
    {
      title: "สุกี้",
      count: 16,
      income: 1800 / 3,
    },
    {
      title: "ข้าวไข่เจียว",
      count: 15,
      income: 1500 / 4,
    },
    {
      title: "ข้าวต้ม",
      count: 10,
      income: 1000,
    },
  ];

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

      <Pie
        key={key}
        appendPadding={10}
        data={data}
        label={{
          type: "outer",
        }}
        interactions={[
          {
            type: "element-active",
          },
        ]}
        angleField={option === "จำนวนที่ขายได้" ? "count" : "income"}
        colorField="title"
      />
    </Card>
  );
};

export default MenuRank;
