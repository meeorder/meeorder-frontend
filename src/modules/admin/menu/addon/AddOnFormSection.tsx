import AddOnModal from "@/modules/admin/menu/addon/AddOnModal";
import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import { addOnData, type AddOnDataType } from "@/modules/admin/mock/addon";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H4, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Card, Table } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useState } from "react";

const columns: ColumnsType<AddOnDataType> = [
  {
    title: "Add-On Name",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "100px",
  },
];

const AddOnFormSection: React.FC = () => {
  const { consoleSectionMode, editMenuId } = useConsoleSectionMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <H4>Add-on</H4>
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
            Edit
          </CenterContentButton>
        }
      >
        <Table
          columns={columns}
          dataSource={addOnData}
          scroll={{ y: "20vh", x: "max-content" }}
          pagination={false}
          style={{ width: "99%" }}
          rowKey={(record) => record.id}
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
