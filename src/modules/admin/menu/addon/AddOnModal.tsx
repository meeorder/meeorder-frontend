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

export type AddOnModalDataType = {
  id: string;
  key: React.Key;
  title: string;
  price: number;
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

const addOnModalData: AddOnModalDataType[] = [
  {
    id: "1",
    key: "1",
    title: "Add-On-Modal 1",
    price: 100,
  },
  {
    id: "2",
    key: "2",
    title: "Add-On-Modal 2",
    price: 100,
  },
  {
    id: "3",
    key: "3",
    title: "Add-On-Modal 3",
    price: 100,
  },
  {
    id: "4",
    key: "4",
    title: "Add-On-Modal 4",
    price: 100,
  },
  {
    id: "5",
    key: "5",
    title: "Add-On-Modal 5",
    price: 100,
  },
  {
    id: "6",
    key: "6",
    title: "Add-On-Modal 6",
    price: 100,
  },
  {
    id: "7",
    key: "7",
    title: "Add-On-Modal 7",
    price: 100,
  },
  {
    id: "8",
    key: "8",
    title: "Add-On-Modal 8",
    price: 100,
  },
  {
    id: "9",
    key: "9",
    title: "Add-On-Modal 9",
    price: 100,
  },
  {
    id: "10",
    key: "10",
    title: "Add-On-Modal 10",
    price: 100,
  },
];
const row_selection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: AddOnModalDataType[],
  ) => {
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `selectedRowKeys: ${selectedRowKeys}`,
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
            <CenterContainButton icon={<Plus />}>Add New</CenterContainButton>
            <CenterContainButton
              type="primary"
              onClick={() => setIsModalOpen(false)}
            >
              Apply to menu
            </CenterContainButton>
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

const CenterContainButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
