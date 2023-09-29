import AppLayout from "@/modules/AppLayout";
import DeleteUserModal from "@/modules/admin/setting/userManagement/components/DeleteUserModal";
import UserManagement from "@/modules/admin/setting/userManagement/components/UserManagement";
import { useState } from "react";

const AdminUserManagement = () => {
  const [idUserToDelete, setIdUserToDelete] = useState<string | null>(null);

  return (
    <AppLayout layoutType="admin" currentPageId="adminUserManagement">
      <UserManagement setIdUserToDelete={setIdUserToDelete} />
      <DeleteUserModal
        idUserToDelete={idUserToDelete}
        setIdUserToDelete={setIdUserToDelete}
      />
    </AppLayout>
  );
};

export default AdminUserManagement;
