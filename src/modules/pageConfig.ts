import { type LayoutType } from "@/modules/AppLayout";
import { type Role } from "@/modules/services/users";
import {
  Basket,
  CheckCircle,
  ClipboardText,
  Fish,
  Gauge,
  House,
  ListBullets,
  PencilSimpleLine,
  User,
} from "@phosphor-icons/react";

export type PageMetaData = {
  id: string;
  label: string;
  path: string;
  layout: LayoutType;
  Icon?: React.FC;
  minimumRole?: Role;
};

export const pages = {
  home: {
    id: "home",
    label: "หน้าหลัก",
    path: "/",
    layout: "user",
    Icon: House,
    minimumRole: undefined,
  },
  basket: {
    id: "basket",
    label: "ตะกร้า",
    path: "/basket",
    layout: "user",
    Icon: Basket,
    minimumRole: undefined,
  },
  orders: {
    id: "orders",
    label: "รายการที่สั่ง",
    path: "/orders",
    layout: "user",
    Icon: ClipboardText,
    minimumRole: undefined,
  },
  adminDashboard: {
    id: "adminDashboard",
    label: "แดชบอร์ด",
    path: "/admin",
    layout: "admin",
    Icon: Gauge,
    minimumRole: "Owner",
  },
  adminAddEditMenu: {
    id: "adminAddEditMenu",
    label: "จัดการเมนูอาหาร",
    path: "/admin/menu",
    layout: "admin",
    Icon: PencilSimpleLine,
    minimumRole: "Owner",
  },
  adminAddEditPromotion: {
    id: "adminAddEditPromotion",
    label: "จัดการโปรโมชั่น",
    path: "/admin/promotion",
    layout: "admin",
    Icon: ListBullets,
    minimumRole: "Owner",
  },
  adminEditPoint: {
    id: "adminEditPoint",
    label: "จัดการสัดส่วนแต้ม",
    path: "/admin/promotion/edit-point",
    layout: "admin",
    minimumRole: "Owner",
  },
  adminEditCoupon: {
    id: "adminEditCoupon",
    label: "จัดการคูปอง",
    path: "/admin/promotion/edit-coupon",
    layout: "admin",
    minimumRole: "Owner",
  },
  adminSalesReport: {
    id: "adminSalesReport",
    label: "รายงานการขาย",
    path: "/admin/sales-report",
    layout: "admin",
    Icon: CheckCircle,
    minimumRole: "Owner",
  },
  adminSetting: {
    id: "adminSetting",
    label: "จัดการร้านอาหาร",
    path: "/admin/setting",
    layout: "admin",
    Icon: User,
    minimumRole: "Owner",
  },
  adminRestaurantAccountManagement: {
    id: "adminRestaurantAccountManagement",
    label: "จัดการโลโก้และชื่อร้านอาหาร",
    path: "/admin/setting/restaurant-account-management",
    layout: "admin",
    minimumRole: "Owner",
  },
  adminUserManagement: {
    id: "adminUserManagement",
    label: "จัดการบัญชีทั้งหมด",
    path: "/admin/setting/user-management",
    layout: "admin",
    minimumRole: "Owner",
  },
  employeeStock: {
    id: "employeeStock",
    label: "จัดการวัตถุดิบ",
    path: "/admin/stock",
    layout: "admin",
    Icon: Fish,
    minimumRole: "Employee",
  },
  employeeOrderManagement: {
    id: "employeeOrderManagement",
    label: "จัดการออเดอร์",
    path: "/admin/order-management",
    layout: "admin",
    Icon: ClipboardText,
    minimumRole: "Employee",
  },
  accountManagement: {
    id: "accountManagement",
    label: "จัดการบัญชีส่วนตัว",
    path: "/admin/account-management",
    layout: "admin",
    Icon: User,
    minimumRole: "Employee",
  },
} as const satisfies Record<string, PageMetaData>;

export type PagePath = (typeof pages)[keyof typeof pages]["path"];

export type PageId = keyof typeof pages;
