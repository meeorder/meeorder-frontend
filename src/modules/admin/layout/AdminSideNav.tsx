import WireFrame from "@/modules/mock/components/WireFrame";
import { pages, type PageId } from "@/modules/pageConfig";
import { Layout, Menu, type MenuProps } from "antd";
import { useRouter } from "next/router";
type AdminSideNavProps = {
  currentPageId: PageId;
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const AdminSideNav: React.FC<AdminSideNavProps> = ({ currentPageId }) => {
  const {
    adminDashboard,
    adminAddEditMenu,
    adminAddEditPromotion,
    adminEditPoint,
    adminEditCoupon,
    adminSalesReport,
    adminSetting,
  } = pages;
  const router = useRouter();

  const items: MenuProps["items"] = [
    adminDashboard,
    adminAddEditMenu,
    adminAddEditPromotion,
    adminSalesReport,
    adminSetting,
  ].map((page) => {
    if (page.id == adminAddEditPromotion.id) {
      return getItem(page.label, page.id, <page.Icon />, [
        ...[adminEditPoint, adminEditCoupon].map((page) =>
          getItem(page.label, page.id),
        ),
      ]);
    } else {
      return getItem(page.label, page.id, <page.Icon />);
    }
  });

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
        defaultOpenKeys={
          [adminEditCoupon.id, adminEditPoint.id].some(
            (id) => id == currentPageId,
          )
            ? [adminAddEditPromotion.id]
            : []
        }
        onClick={({ key }) => {
          const page = pages[key as PageId];
          if (page.id == adminAddEditPromotion.id) return;

          if (router.pathname !== page.path) {
            void router.push(page.path);
          }
        }}
        items={items}
      />
    </Layout.Sider>
  );
};

export default AdminSideNav;
