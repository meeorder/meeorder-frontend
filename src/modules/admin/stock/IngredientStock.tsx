import {
  stockIngredientData,
  type StockIngredientDataType,
} from "@/modules/admin/mock/stock";

import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import styled from "@emotion/styled";
import { Card, Switch, Table } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useState } from "react";

const IngredientStock = () => {
  const [dataSource, setDataSource] = useState(stockIngredientData);

  const stockIngredientColumns: ColumnsType<StockIngredientDataType> = [
    {
      title: "ชื่อวัตถุดิบ",
      dataIndex: "name",
      key: "name",
      width: "70px",
    },
    {
      title: "เมนูที่ใช้วัตถุดิบ",
      dataIndex: "usedInMenu",
      width: "60px",
      align: "end",
    },
    {
      title: "วัตถุดิบคงเหลือ",
      dataIndex: "available",
      width: "60px",
      align: "end",
      render: (text: string, rec) => (
        <>
          <Switch
            checked={rec.available}
            onClick={() => {
              console.log(`bruh ingredient ${rec.id} ${text}`);
              const id = rec.id;
              const value = !rec.available;
              setDataSource((prev) => [
                ...prev.map(function (rec) {
                  //ไม่ชิน arrow function
                  if (rec.id == id) {
                    rec.available = value;
                  }
                  return rec;
                }),
              ]);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <StyledCard
      title={<div>จัดการวัตถุดิบ</div>}
      extra={
        <CenterContentButton
          type="primary"
          onClick={function () {
            console.log("bruh all ingredients");
            setDataSource((prev) => [
              ...prev.map(function (rec) {
                rec.available = true;
                return rec;
              }),
            ]);
          }}
        >
          เติมวัตถุดิบทั้งหมด
        </CenterContentButton>
      }
    >
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={stockIngredientColumns}
        scroll={{ y: "70vh", x: "max-content" }}
      />
    </StyledCard>
  );
};

export default IngredientStock;

const StyledCard = styled(Card)`
  flex: 1;
  width: 40vw;
`;
