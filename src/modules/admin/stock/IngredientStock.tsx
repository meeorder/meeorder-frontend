import {
  useActivateAllIngredients,
  useAllIngredients,
  useUpdateIngredient,
  type Ingredient,
} from "@/modules/admin/menu/hooks/useIngredients";

import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import styled from "@emotion/styled";
import { Card, Switch, Table } from "antd";
import { type ColumnsType } from "antd/es/table";

const IngredientStock = () => {
  const { data: dataSource } = useAllIngredients();
  const { mutate: updateIngredient } = useUpdateIngredient();
  const { mutate: activateAllIngredients } = useActivateAllIngredients();

  const stockIngredientColumns: ColumnsType<Ingredient> = [
    {
      title: "ชื่อวัตถุดิบ",
      dataIndex: "title",
      key: "title",
      width: "70px",
    },
    {
      title: "เมนูที่ใช้วัตถุดิบ",
      dataIndex: "menus_applied",
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
              const id = rec._id;
              const available = !rec.available;
              updateIngredient({ id, available });
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
            activateAllIngredients();
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
        rowKey={(rec) => rec._id}
      />
    </StyledCard>
  );
};

export default IngredientStock;

const StyledCard = styled(Card)`
  flex: 1;
  width: 40vw;
`;
