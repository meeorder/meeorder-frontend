import AppLayout from "@/modules/AppLayout";
import AdminMenuLayout from "@/modules/admin/layout/AdminMenuLayout";

const AdminAddMenu = () => {
  return (
    <AppLayout layoutType="admin" currentPageId="adminAddEditMenu">
      <AdminMenuLayout menuLayoutVariant="add" />
    </AppLayout>
  );
};

export default AdminAddMenu;
