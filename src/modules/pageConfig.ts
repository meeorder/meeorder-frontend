import { type LayoutType } from "@/modules/AppLayout";
import {
  Basket,
  CheckCircle,
  ClipboardText,
  Gauge,
  House,
  PencilSimpleLine,
  User,
} from "@phosphor-icons/react";

type PageMetaData = {
  id: string;
  label: string;
  path: string;
  layout: LayoutType;
  Icon: React.FC;
};

export const pages = {
  home: {
    id: "home",
    label: "Home",
    path: "/",
    layout: "user",
    Icon: House,
  },
  basket: {
    id: "basket",
    label: "Basket",
    path: "/basket",
    layout: "user",
    Icon: Basket,
  },
  orders: {
    id: "orders",
    label: "My Orders",
    path: "/orders",
    layout: "user",
    Icon: ClipboardText,
  },
  adminDashboard: {
    id: "adminDashboard",
    label: "Dashboard",
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
    Icon: PencilSimpleLine,
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
} as const satisfies Record<string, PageMetaData>;

export type PagePath = (typeof pages)[keyof typeof pages]["path"];

export type PageId = keyof typeof pages;
