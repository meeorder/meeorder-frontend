import AppLayout from "@/modules/AppLayout";
import AdminMenuLayout from "@/modules/admin/layout/AdminMenuLayout";

const AdminEditMenu = () => {
  return (
    <AppLayout layoutType="admin" currentPageId="adminAddEditMenu">
      <AdminMenuLayout menuLayoutVariant="edit" />
    </AppLayout>
  );
};

export default AdminEditMenu;
