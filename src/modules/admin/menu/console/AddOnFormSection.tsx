import AddOnModal from "@/modules/admin/menu/console/AddOnModal";
import {
  useAllAddons,
  useSelectedAddonsStore,
  type Addon,
} from "@/modules/admin/menu/hooks/useAddons";
import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H4, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Card, Table } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useState } from "react";

const columns: ColumnsType<Addon> = [
  {
    title: "ชื่อ",
    dataIndex: "title",
  },
  {
    title: "ราคา",
    dataIndex: "price",
    width: "100px",
    align: "right",
  },
];

const AddOnFormSection: React.FC = () => {
  const { data: allAddons } = useAllAddons();
  const { consoleSectionMode, editMenuId } = useConsoleSectionMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedAddonIds } = useSelectedAddonsStore();
  return (
    <>
      <AddOnFormCard
        title={
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
            }}
          >
            <H4>ท็อปปิ้ง</H4>
            {consoleSectionMode === "edit-menu" && (
              <Text type="secondary"> ({editMenuId}) </Text>
            )}
          </div>
        }
        bordered={false}
        extra={
          <CenterContentButton
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            แก้ไข
          </CenterContentButton>
        }
      >
        <Table
          columns={columns}
          dataSource={
            allAddons?.filter(
              (addon) => selectedAddonIds?.find((id) => addon._id === id),
            ) ?? []
          }
          scroll={{ y: "20vh", x: "max-content" }}
          pagination={false}
          style={{ width: "99%" }}
          rowKey={(record) => record._id}
        />
      </AddOnFormCard>
      <AddOnModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default AddOnFormSection;

const AddOnFormCard = styled(Card)`
  flex: 1;
  padding: 0px 24px 24px 24px;
  .ant-card-head {
    padding: 0;
    height: 64px;
  }
  .ant-card-body {
    padding: 0;
    margin: 0;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }
`;
