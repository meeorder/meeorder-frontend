import useDeleteUser from "@/modules/admin/setting/userManagement/hooks/useDeleteUser";
import { H4, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Modal, Result } from "antd";

type DeleteUserModalProps = {
  idUserToDelete: string | null;
  setIdUserToDelete: (id: string | null) => void;
};

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  idUserToDelete,
  setIdUserToDelete,
}) => {
  const { mutate: deleteUser } = useDeleteUser();

  return (
    <StyledModal
      closable={false}
      open={idUserToDelete !== null}
      centered
      okButtonProps={{ danger: true }}
      onOk={() => {
        if (idUserToDelete !== null) {
          deleteUser(idUserToDelete);
        }
        setIdUserToDelete(null);
      }}
      okText="ลบ"
      onCancel={() => {
        setIdUserToDelete(null);
      }}
      cancelText="ยกเลิก"
    >
      <Result
        status="warning"
        title={
          <ModalContent>
            <H4>คุณต้องการจะลบบัญชีนี้หรือไม่?</H4>
            <Text>ข้อมูลทั้งหมดในบัญชีนี้จะถูกลบ</Text>
          </ModalContent>
        }
        style={{ paddingBottom: "0px", paddingTop: "0px" }}
      />
    </StyledModal>
  );
};

export default DeleteUserModal;

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: flex;
    justify-content: center;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-block: 24px;
`;
