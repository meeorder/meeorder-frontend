import {
  useActivateAllAddons,
  useAllAddons,
  useChangeAddonStatus,
  type Addon,
} from "@/modules/admin/menu/hooks/useAddons";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Card, Switch, Table } from "antd";
import { type ColumnsType } from "antd/es/table";

const AddonStock = () => {
  const { data: dataSource } = useAllAddons();
  const { mutate: changeAddonStatus } = useChangeAddonStatus();
  const { mutate: activateAllAddons } = useActivateAllAddons();

  const stockAddonColumns: ColumnsType<Addon> = [
    {
      title: "ชื่อท็อปปิ้ง",
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
      title: "เมนูที่ใช้ท็อปปิ้ง",
      dataIndex: "menus_applied",
      width: "50px",
      align: "end",
    },
    {
      title: "ท็อปปิ้งคงเหลือ",
      dataIndex: "available",
      width: "50px",
      align: "end",
      render: (text: string, rec) => (
        <>
          <Switch
            checked={rec.available}
            onClick={() => {
              const id = rec._id;
              const status = !rec.available ? "activate" : "deactivate";
              changeAddonStatus({ id, status });
            }}
          />
        </>
      ),
    },
    {
      title: "ตัวดำเนินการ",
      //dataIndex: "price",
      width: "20px",
      render: (text: string, rec) => (
        <>
          {/* <CenterContentButton type="link" style={{ display: "inline-flex" }}>
            ลบ
          </CenterContentButton> */}
          <Button
            type="link"
            onClick={() => {
              const id = rec._id;
              const status = !rec.available ? "activate" : "deactivate";
              changeAddonStatus({ id, status });
            }}
          >
            ลบ
          </Button>
        </>
      ),
    },
  ];

  return (
    <StyledCard
      title={<div>จัดการท็อปปิ้ง</div>}
      extra={
        <>
          <CenterContentButton
            type="default"
            style={{ display: "inline-flex", marginRight: "10px" }}
          >
            + เพิ่มท็อปปิ้งใหม่
          </CenterContentButton>
          <CenterContentButton
            type="primary"
            style={{ display: "inline-flex" }}
            onClick={function () {
              activateAllAddons();
            }}
          >
            เติมท็อปปิ้งทั้งหมด
          </CenterContentButton>
        </>
      }
    >
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={stockAddonColumns}
        scroll={{ y: "70vh", x: "max-content" }}
        rowKey={(rec) => rec._id}
      />
    </StyledCard>
  );
};

export default AddonStock;

const StyledCard = styled(Card)`
  flex: 1;
  width: 40vw;
`;
