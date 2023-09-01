import {
  addOnModalData,
  type AddOnModalDataType,
} from "@/modules/admin/mock/addon";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Plus } from "@phosphor-icons/react";
import { Button, Input, Modal, Table } from "antd";
import { type ColumnsType } from "antd/es/table";
import { type Dispatch, type SetStateAction } from "react";

type AddOnModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const modal_columns: ColumnsType<AddOnModalDataType> = [
  {
    title: "Add-On Name",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
    width: "70px",
  },
  {
    title: "Action",
    width: "300px",
    render: () => {
      return (
        <>
          <Button type="link">Edit</Button>
          <Button type="link">Delete</Button>
        </>
      );
    },
  },
];

const row_selection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: AddOnModalDataType[],
  ) => {
    console.log(
      "selectedRowKeys: ",
      selectedRowKeys,
      "selectedRows: ",
      selectedRows,
    );
  },
  getCheckboxProps: (record: AddOnModalDataType) => {
    console.log(record);
    return {
      key: record.key.toString(),
      id: record.id,
      title: record.title,
      price: record.price,
    };
  },
};

const AddOnModal: React.FC<AddOnModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal
      title={
        <ModalHeader>
          <H4>Add-on</H4>
          <ModalActionContainer>
            <CenterContentButton icon={<Plus />}>Add New</CenterContentButton>
            <CenterContentButton
              type="primary"
              onClick={() => setIsModalOpen(false)}
            >
              Apply to menu
            </CenterContentButton>
          </ModalActionContainer>
        </ModalHeader>
      }
      open={isModalOpen}
      footer={false}
      closeIcon={false}
      centered={true}
      width={"50%"}
    >
      <Input.Search
        style={{
          marginTop: "4px",
          marginBottom: "12px",
        }}
        placeholder="input search text"
        allowClear
      />
      <Table
        rowSelection={row_selection}
        columns={modal_columns}
        dataSource={addOnModalData}
        pagination={false}
        scroll={{ y: "60vh", x: "max-content" }}
      />
    </Modal>
  );
};

export default AddOnModal;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;