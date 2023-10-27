import {
  useActivateAllIngredients,
  useAllIngredients,
  useCreateIngredient,
  useDeleteIngredient,
  useUpdateIngredient,
  type Ingredient,
} from "@/modules/admin/menu/hooks/useIngredients";

import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { roleNumberToRole } from "@/modules/services/users";
import styled from "@emotion/styled";
import { Button, Card, Popconfirm, Switch, Table } from "antd";
import { type ColumnsType } from "antd/es/table";

const IngredientStock = () => {
  const { data: dataSource } = useAllIngredients();
  const { data: user } = useUser();
  const { mutate: updateIngredient } = useUpdateIngredient();
  const { mutate: activateAllIngredients } = useActivateAllIngredients();
  const { mutate: deleteIngredient } = useDeleteIngredient();
  const { mutate: createIngredient } = useCreateIngredient();
  const isOwner = roleNumberToRole[user?.role ?? 1] === "Owner";

  const stockIngredientColumns: ColumnsType<Ingredient> = [
    {
      title: "ชื่อวัตถุดิบ",
      dataIndex: "title",
      key: "title",
      width: "70px",
      render: (text: string, rec) => (
        <>
          <Text
            editable={
              isOwner && {
                onChange: (new_title) => {
                  const id = rec._id;
                  const title = new_title;
                  updateIngredient({ id, title });
                },
              }
            }
          >
            {text}
          </Text>
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
  ];

  if (isOwner) {
    stockIngredientColumns.push({
      title: "ตัวดำเนินการ",
      //dataIndex: "price",
      width: "60px",
      align: "end",
      render: (text: string, rec) => (
        <>
          <Popconfirm
            title="ต้องการลบวัตถุดิบหรือไม่"
            onConfirm={() => {
              const id = rec._id;
              deleteIngredient({ id });
            }}
            okText="ตกลง"
            cancelText="ยกเลิก"
          >
            <Button type="link">ลบ</Button>
          </Popconfirm>
        </>
      ),
    });
  }

  return (
    <StyledCard
      title={<div>จัดการวัตถุดิบ</div>}
      extra={
        <>
          {isOwner && (
            <CenterContentButton
              type="default"
              style={{ display: "inline-flex", marginRight: "10px" }}
              onClick={function () {
                createIngredient({
                  title:
                    "วัตถุดิบใหม่" +
                    (((dataSource?.length || 0) + 1)?.toString() || ""),
                  available: true,
                });
              }}
            >
              + เพิ่มวัตถุดิบใหม่
            </CenterContentButton>
          )}
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
