import {
  useActivateAllAddons,
  useAllAddons,
  useChangeAddonStatus,
  useCreateAddon,
  useDeleteAddon,
  useEditAddon,
  type Addon,
} from "@/modules/admin/menu/hooks/useAddons";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { roleNumberToRole } from "@/modules/services/users";
import styled from "@emotion/styled";
import { Button, Card, Popconfirm, Switch, Table } from "antd";
import { type ColumnsType } from "antd/es/table";

const AddonStock = () => {
  const { data: dataSource } = useAllAddons();
  const { mutate: changeAddonStatus } = useChangeAddonStatus();
  const { mutate: activateAllAddons } = useActivateAllAddons();
  const { mutate: deleteAddon } = useDeleteAddon();
  const { mutate: createAddon } = useCreateAddon();
  const { mutate: editAddon } = useEditAddon();
  const { data: user } = useUser();
  const isOwner = roleNumberToRole[user?.role ?? 1] === "Owner";
  const stockAddonColumns: ColumnsType<Addon> = [
    {
      title: "ชื่อท็อปปิ้ง",
      dataIndex: "title",
      key: "title",
      width: "10px",
      render: (text: string, rec) => (
        <>
          <Text
            editable={
              isOwner && {
                onChange: (new_title) => {
                  editAddon({ ...rec, title: new_title, id: rec._id });
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
      title: "ราคาท็อปปิ้ง(บาท)",
      dataIndex: "price",
      width: "50px",
      align: "end",
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
      width: "20px",
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
    isOwner
      ? {
          title: "ตัวดำเนินการ",
          width: "10px",
          render: (text: string, rec) => (
            <>
              <Popconfirm
                title="ต้องการลบท็อปปิ้งหรือไม่"
                onConfirm={() => {
                  const id = rec._id;
                  deleteAddon({ id });
                }}
                okText="ตกลง"
                cancelText="ยกเลิก"
              >
                <Button type="link">ลบ</Button>
              </Popconfirm>
            </>
          ),
        }
      : { width: "0px" },
  ];

  return (
    <StyledCard
      title={<div>จัดการท็อปปิ้ง</div>}
      extra={
        isOwner && (
          <>
            <CenterContentButton
              type="default"
              style={{ display: "inline-flex", marginRight: "10px" }}
              onClick={function () {
                createAddon({ title: "New Addon", price: 0 });
              }}
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
        )
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
