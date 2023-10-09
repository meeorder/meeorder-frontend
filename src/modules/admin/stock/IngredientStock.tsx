import {
  useActivateAllIngredients,
  useAllIngredients,
  useUpdateIngredient,
  type Ingredient,
} from "@/modules/admin/menu/hooks/useIngredients";

import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Card, Switch, Table } from "antd";
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
      render: (text: string) => (
        <>
          <Text editable>{text}</Text>
        </>
      ),
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
    {
      title: "ตัวดำเนินการ",
      //dataIndex: "price",
      width: "60px",
      align: "end",
      render: (text: string, rec) => (
        <>
          {/* <CenterContentButton type="link" style={{ display: "inline-flex" }}>
            ลบ
          </CenterContentButton> */}
          <Button type="link">ลบ</Button>
        </>
      ),
    },
  ];

  return (
    <StyledCard
      title={<div>จัดการวัตถุดิบ</div>}
      extra={
        <>
          <CenterContentButton
            type="default"
            style={{ display: "inline-flex", marginRight: "10px" }}
          >
            + เพิ่มวัตถุดิบใหม่
          </CenterContentButton>
          <CenterContentButton
            type="primary"
            style={{ display: "inline-flex" }}
            onClick={function () {
              activateAllIngredients();
            }}
          >
            เติมวัตถุดิบทั้งหมด
          </CenterContentButton>
        </>
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
