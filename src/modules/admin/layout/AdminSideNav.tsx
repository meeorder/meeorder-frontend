import useRestaurantSetting from "@/modules/admin/setting/restaurantManagement/hooks/useRestaurantSetting";
import { H5 } from "@/modules/common/components/Typography";
import { useClient } from "@/modules/common/hooks/useClient";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { pages, type PageId, type PageMetaData } from "@/modules/pageConfig";
import { roleToRoleNumber } from "@/modules/services/users";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Layout, Menu, type MenuProps } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type AdminSideNavProps = {
  currentPageId: PageId;
};

type MenuItem = Required<MenuProps>["items"][number];

const AdminSideNav: React.FC<AdminSideNavProps> = ({ currentPageId }) => {
  const {
    adminDashboard,
    adminAddEditMenu,
    adminAddEditPromotion,
    adminEditCoupon,
    adminSalesReport,
    adminSetting,
    adminRestaurantAccountManagement,
    adminUserManagement,
    cashierTableManagement,
    employeeStock,
    employeeOrderManagement,
    accountManagement,
    adminTitleMenuAndCoupon,
    adminTitleInShopOrder,
    adminTitleShopManagement,
  } = pages;

  const router = useRouter();

  const { data: user } = useUser();
  const { data: restaurant } = useRestaurantSetting();
  const adminPages = [
    [adminDashboard, adminDashboard, adminSalesReport],
    [adminTitleMenuAndCoupon, adminAddEditMenu, employeeStock, adminEditCoupon],
    [adminTitleInShopOrder, cashierTableManagement, employeeOrderManagement],
    [
      adminTitleShopManagement,
      adminRestaurantAccountManagement,
      adminUserManagement,
    ],
    accountManagement,
  ] satisfies (PageMetaData | PageMetaData[])[];

  const employeePages = [
    [adminDashboard, adminDashboard, adminSalesReport],
    [adminTitleMenuAndCoupon, adminAddEditMenu, adminEditCoupon],
    [
      adminTitleInShopOrder,
      cashierTableManagement,
      employeeOrderManagement,
      employeeStock,
    ],
    [
      adminTitleShopManagement,
      adminRestaurantAccountManagement,
      adminUserManagement,
    ],
    accountManagement,
  ] satisfies (PageMetaData | PageMetaData[])[];
  const navPages =
    (user?.role || 0) >= roleToRoleNumber.Owner ? adminPages : employeePages;
  const getItem = (
    page: PageMetaData,
    children?: PageMetaData[],
  ): MenuItem | null => {
    if (!page) return null;

    if (roleToRoleNumber[page.minimumRole ?? "Customer"] <= (user?.role ?? 1)) {
      return {
        key: page.id,
        icon: page.Icon && <page.Icon />,
        label: page.label,
        children: children?.map((page) => getItem(page)),
      };
    }
    return null;
  };

  const items: MenuProps["items"] | MenuProps["items"][] = navPages
    .map((page) => {
      if (Array.isArray(page)) {
        return getItem(page[0] as PageMetaData, page.slice(1));
      }
      return getItem(page);
    })
    .filter((item) => Boolean(item));

  const [collapsed, setCollapsed] = useState(false);

  const { isClientLoaded } = useClient();

  useEffect(() => {
    setCollapsed(localStorage.getItem("collapsed") === "true");
  }, []);

  if (!isClientLoaded) return null;

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
      <LogoContainer>
        <Logo
          style={{
            backgroundImage: `url(${
              restaurant?.logo ?? "https://picsum.photos/200/306"
            })`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {!collapsed && (
          <H5
            style={{
              width: collapsed ? 0 : "50%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "width 0.5s",
            }}
          >
            {restaurant?.name ?? "ชื่อร้านอาหาร"}
          </H5>
        )}
      </LogoContainer>
      <Menu
        style={{ height: "calc(100% - 64px - 64px)", overflowY: "auto" }}
        theme="light"
        mode="inline"
        defaultSelectedKeys={[currentPageId]}
        defaultOpenKeys={
          navPages
            .filter(
              (page) =>
                Array.isArray(page) &&
                page.some((page) => page.id == currentPageId),
            )
            .map((page) => (Array.isArray(page) ? page?.[0]?.id : ""))
            .filter((id) => !!id) as string[]
        }
        onClick={({ key }) => {
          const page = pages[key as PageId];
          if (page.id == adminAddEditPromotion.id) return;
          if (page.id == adminSetting.id) return;

          if (router.pathname !== page.path) {
            void router.push(page.path);
          }
        }}
        items={items}
      />
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() =>
          setCollapsed((prev) => {
            localStorage.setItem("collapsed", !prev ? "true" : "false");
            return !prev;
          })
        }
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

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  gap: 12px;
`;

const Logo = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 4px;
  flex-shrink: 0;
`;
