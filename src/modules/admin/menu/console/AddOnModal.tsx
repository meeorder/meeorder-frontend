import {
  addOnModalData,
  type AddOnModalDataType,
} from "@/modules/admin/mock/addon";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H4, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Plus } from "@phosphor-icons/react";
import { Button, Input, Modal, Table } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useState, type Dispatch, type SetStateAction } from "react";

type AddOnModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

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
  const [dataSource, setDataSource] = useState(addOnModalData);
  const handleDelete = (id: string) => {
    setDataSource((prev) => [...prev.filter((rec) => rec.id !== id)]);
  };
  const handleTitleChange = (id: string, new_title: string) => {
    setDataSource((prev) => [
      ...prev.map((rec) =>
        rec.id === id ? { ...rec, title: new_title } : rec,
      ),
    ]);
  };
  const handlePriceChange = (id: string, new_price: string) => {
    const new_price_number = parseFloat(new_price);
    if (!Number.isNaN(new_price_number)) {
      setDataSource((prev) => [
        ...prev.map((rec) =>
          rec.id === id ? { ...rec, price: parseFloat(new_price) } : rec,
        ),
      ]);
    }
  };
  const handleCreateAddOn = () => {
    setDataSource((prev) => [
      {
        id: new Date().toString(),
        key: new Date().toString(),
        title: "New Addon",
        price: 100,
      },
      ...prev,
    ]);
  };
  const modal_columns: ColumnsType<AddOnModalDataType> = [
    {
      title: "ชื่อ",
      dataIndex: "title",
      render: (text: string, rec) => (
        <Text
          editable={{
            onChange: (value) => {
              handleTitleChange(rec.id, value);
            },
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "ราคา",
      dataIndex: "price",
      width: "90px",
      render: (text: string, rec) => (
        <Text
          editable={{
            onChange: (value) => {
              handlePriceChange(rec.id, value);
            },
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      width: "300px",
      render: (_, rec) => {
        return (
          <Button
            type="link"
            onClick={() => {
              handleDelete(rec.id);
            }}
          >
            ลบ
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title={
        <ModalHeader>
          <H4>ท็อปปิ้ง</H4>
          <ModalActionContainer>
            <CenterContentButton
              icon={<Plus />}
              onClick={() => {
                handleCreateAddOn();
              }}
            >
              เพิ่ม
            </CenterContentButton>
            <CenterContentButton
              type="primary"
              onClick={() => setIsModalOpen(false)}
            >
              ยืนยัน
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
        placeholder="ค้นหา"
        allowClear
      />
      <Table
        rowSelection={row_selection}
        columns={modal_columns}
        dataSource={dataSource}
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
