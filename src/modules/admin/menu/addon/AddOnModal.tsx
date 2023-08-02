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
    width: "50px",
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
    title: "ไข่ดาว",
    price: 100,
  },
  {
    id: "2",
    title: "ไข่เจียว",
    price: 100,
  },
  {
    id: "3",
    title: "ไข่ต้ม",
    price: 100,
  },
  {
    id: "4",
    title: "ไข่เยี่ยวม้า",
    price: 100,
  },
  {
    id: "5",
    title: "ผักเซอราลี",
    price: 100,
  },
];

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
      <Table columns={modal_columns} dataSource={addOnModalData} />
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
