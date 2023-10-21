import {
  useAllAddons,
  useSelectedAddonsStore,
  type Addon,
} from "@/modules/admin/menu/hooks/useAddons";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H4, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Modal, Table } from "antd";
import { type ColumnsType } from "antd/es/table";
import { type Key } from "antd/es/table/interface";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type AddOnModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  initialData?: Addon[];
};

const AddOnModal: React.FC<AddOnModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { data: dataSource } = useAllAddons();
  const { selectedAddonIds, setSelectedAddonIds } = useSelectedAddonsStore();
  const [newSelectedAddonIds, setNewSelectedAddonIds] =
    useState<Addon["_id"][]>();
  useEffect(() => {
    if (selectedAddonIds) {
      setNewSelectedAddonIds(selectedAddonIds);
    }
  }, [selectedAddonIds, setSelectedAddonIds, isModalOpen]);

  const row_selection = {
    onChange: (selectedRowKeys: Key[]) => {
      setNewSelectedAddonIds(selectedRowKeys as Addon["_id"][]);
    },
    selectedRowKeys: newSelectedAddonIds ?? [],
  };

  const modal_columns: ColumnsType<Addon> = [
    {
      title: "ชื่อ",
      dataIndex: "title",
      render: (text: string, _) => <Text>{text}</Text>,
    },
    {
      title: "ราคา",
      dataIndex: "price",
      width: "90px",
      render: (text: string, _) => <Text>{text}</Text>,
    },
  ];
  const handleConfirmSelectAddon = () => {
    setSelectedAddonIds(newSelectedAddonIds ?? []);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <ModalHeader>
          <H4>ท็อปปิ้ง</H4>
          <ModalActionContainer>
            <CenterContentButton
              type="primary"
              onClick={handleConfirmSelectAddon}
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
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <Table
        rowKey={(record) => record._id}
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
