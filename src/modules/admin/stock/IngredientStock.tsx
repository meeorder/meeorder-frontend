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
      dataIndex: "used_in_menu",
      width: "60px",
    },
    {
      title: "วัตถุดิบคงเหลือ",
      dataIndex: "can_use_ingredient",
      key: "can_use_ingredient",
      width: "60px",
      render: (text: string, rec) => (
        <>
          <Switch checked={rec.can_use_ingredient} />
        </>
      ),
    },
  ];

  return (
    <StyledCard
      title={<div>จัดการวัตถุดิบ</div>}
      extra={
        <CenterContentButton type="primary">
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
