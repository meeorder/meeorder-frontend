import {
  useAllAddons,
  useCreateAddon,
  useDeleteAddon,
  useEditAddon,
  useSelectedAddonsStore,
  type Addon,
} from "@/modules/admin/menu/hooks/useAddons";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H4, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Plus } from "@phosphor-icons/react";
import { Button, Input, Modal, Table } from "antd";
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
  const { mutate: deleteAddon } = useDeleteAddon();
  const { mutate: createAddon } = useCreateAddon();
  const { mutate: editAddon } = useEditAddon();
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

  const handleDelete = (id: string) => {
    deleteAddon({ id });
  };
  const handleTitleChange = (addon: Addon, new_title: string) => {
    if (new_title.trim() === "") return;
    editAddon({ ...addon, title: new_title, id: addon._id });
  };
  const handlePriceChange = (addon: Addon, new_price: string) => {
    if (isNaN(Number(new_price))) return;
    editAddon({ ...addon, price: Number(new_price), id: addon._id });
  };
  const handleCreateAddOn = () => {
    createAddon({ title: "New Addon", price: 0 });
  };
  const modal_columns: ColumnsType<Addon> = [
    {
      title: "ชื่อ",
      dataIndex: "title",
      render: (text: string, rec) => (
        <Text
          editable={{
            onChange: (value) => {
              handleTitleChange(rec, value);
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
              handlePriceChange(rec, value);
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
              handleDelete(rec._id);
            }}
          >
            ลบ
          </Button>
        );
      },
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
              icon={<Plus />}
              onClick={() => {
                handleCreateAddOn();
              }}
            >
              เพิ่ม
            </CenterContentButton>
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
      <Input.Search
        style={{
          marginTop: "4px",
          marginBottom: "12px",
        }}
        placeholder="ค้นหา"
        allowClear
      />
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
