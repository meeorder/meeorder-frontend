import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Plus } from "@phosphor-icons/react";
import { Button, Input, Modal, Table } from "antd";
import { type Dispatch, type SetStateAction } from "react";

type AddOnModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
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
    >
      <Input.Search
        style={{
          marginTop: "4px",
          marginBottom: "12px",
        }}
        placeholder="input search text"
        allowClear
      />
      <Table />
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
