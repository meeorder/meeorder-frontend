import AppLayout from "@/modules/AppLayout";
import AdminMenuLayout from "@/modules/admin/layout/AdminMenuLayout";

const AdminMenu = () => {
  return (
    <AppLayout layoutType="admin" currentPageId="adminAddEditMenu">
      <AdminMenuLayout menuLayoutVariant="preview" />
    </AppLayout>
  );
};

export default AdminMenu;
