import WireFrame from "@/modules/mock/components/WireFrame";
import { pages, type PageId } from "@/modules/pageConfig";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
type AdminSideNavProps = {
  currentPageId: PageId;
};

const AdminSideNav: React.FC<AdminSideNavProps> = ({ currentPageId }) => {
  const {
    adminDashboard,
    adminAddEditMenu,
    adminAddEditPromotion,
    adminSalesReport,
    adminSetting,
  } = pages;
  const router = useRouter();

  return (
    <Layout.Sider
      theme="light"
      style={{
        marginBlock: 24,
        borderRadius: "0px 12px 12px 0px",
      }}
    >
      <WireFrame contentNode="Logo" cardColor="blue" height={"100px"} />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[currentPageId]}
        onClick={({ key }) => {
          const page = pages[key as PageId];
          void router.push(page.path);
        }}
        items={[
          adminDashboard,
          adminAddEditMenu,
          adminAddEditPromotion,
          adminSalesReport,
          adminSetting,
        ].map((page) => ({
          key: page.id,
          label: page.label,
          icon: <page.Icon />,
        }))}
      />
    </Layout.Sider>
  );
};

export default AdminSideNav;
