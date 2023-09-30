import { type LayoutType } from "@/modules/AppLayout";
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
};

export const pages = {
  home: {
    id: "home",
    label: "หน้าหลัก",
    path: "/",
    layout: "user",
    Icon: House,
  },
  basket: {
    id: "basket",
    label: "ตะกร้า",
    path: "/basket",
    layout: "user",
    Icon: Basket,
  },
  orders: {
    id: "orders",
    label: "รายการที่สั่ง",
    path: "/orders",
    layout: "user",
    Icon: ClipboardText,
  },
  adminDashboard: {
    id: "adminDashboard",
    label: "แดชบอร์ด",
    path: "/admin",
    layout: "admin",
    Icon: Gauge,
  },
  adminAddEditMenu: {
    id: "adminAddEditMenu",
    label: "จัดการเมนูอาหาร",
    path: "/admin/menu",
    layout: "admin",
    Icon: PencilSimpleLine,
  },
  adminAddEditPromotion: {
    id: "adminAddEditPromotion",
    label: "จัดการโปรโมชั่น",
    path: "/admin/promotion",
    layout: "admin",
    Icon: ListBullets,
  },
  adminEditPoint: {
    id: "adminEditPoint",
    label: "จัดการสัดส่วนแต้ม",
    path: "/admin/promotion/edit-point",
    layout: "admin",
  },
  adminEditCoupon: {
    id: "adminEditCoupon",
    label: "จัดการคูปอง",
    path: "/admin/promotion/edit-coupon",
    layout: "admin",
  },
  adminSalesReport: {
    id: "adminSalesReport",
    label: "รายงานการขาย",
    path: "/admin/sales-report",
    layout: "admin",
    Icon: CheckCircle,
  },
  adminSetting: {
    id: "adminSetting",
    label: "จัดการร้านอาหาร",
    path: "/admin/setting",
    layout: "admin",
    Icon: User,
  },
  adminUserManagement: {
    id: "adminUserManagement",
    label: "จัดการบัญชีทั้งหมด",
    path: "/admin/setting/user-management",
    layout: "admin",
  },
  employeeStock: {
    id: "employeeStock",
    label: "จัดการวัตถุดิบ",
    path: "/admin/stock",
    layout: "admin",
    Icon: Fish,
  },
  employeeOrderManagement: {
    id: "employeeOrderManagement",
    label: "จัดการออเดอร์",
    path: "/admin/order-management",
    layout: "admin",
    Icon: ClipboardText,
  },
} as const satisfies Record<string, PageMetaData>;

export type PagePath = (typeof pages)[keyof typeof pages]["path"];

export type PageId = keyof typeof pages;
