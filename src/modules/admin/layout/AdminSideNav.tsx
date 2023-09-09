import WireFrame from "@/modules/mock/components/WireFrame";
import { pages, type PageId, type PageMetaData } from "@/modules/pageConfig";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, type MenuProps } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
type AdminSideNavProps = {
  currentPageId: PageId;
};

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (page: PageMetaData, children?: PageMetaData[]): MenuItem => {
  return {
    key: page.id,
    icon: page.Icon && <page.Icon />,
    label: page.label,
    children: children?.map((page) => getItem(page)),
  };
};

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
      return getItem(page, [adminEditPoint, adminEditCoupon]);
    }
    return getItem(page);
  });

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider
      collapsed={collapsed}
      collapsedWidth={64}
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
          [adminEditPoint.id, adminEditCoupon.id].some(
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
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: "100%",
          height: 64,
          position: "absolute",
          bottom: 0,
          right: 0,
          borderRadius: "0 0 12px 0",
          borderTop: "1px solid #d9d9d9",
        }}
      />
    </Layout.Sider>
  );
};

export default AdminSideNav;
