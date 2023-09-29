import UserList from "@/modules/admin/setting/userManagement/components/UserList";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Card } from "antd";

type UserManagementProps = {
  setIdUserToDelete: (id: string | null) => void;
};

const UserManagement: React.FC<UserManagementProps> = ({
  setIdUserToDelete,
}) => {
  return (
    <UserManagementContainer title={<H4>จัดการบัญชีทั้งหมด</H4>}>
      <UserList setIdUserToDelete={setIdUserToDelete} />
    </UserManagementContainer>
  );
};

export default UserManagement;

const UserManagementContainer = styled(Card)`
  width: 100%;
  height: 100%;
  padding: 20px 24px;
  .ant-card-head {
    min-height: 64px;
    padding: 0px 12px;
    border-bottom: 0;
  }
  .ant-card-body {
    padding: 0;
  }
`;
