import { type LayoutType } from "@/modules/AppLayout";
import { type Role } from "@/modules/services/users";
import {
  AddressBook,
  Basket,
  Chair,
  CheckCircle,
  ClipboardText,
  Fish,
  Gauge,
  Gear,
  House,
  ListBullets,
  Notebook,
  PencilSimpleLine,
  Storefront,
  Ticket,
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
  adminTitleMenuAndCoupon: {
    id: "adminTitleMenuAndCoupon",
    label: "เมนูและคูปอง",
    path: "/admin/menu",
    layout: "admin",
    Icon: Notebook,
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
    Icon: Ticket,
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
    label: "ตั้งค่าร้านอาหาร",
    path: "/admin/setting/restaurant-account-management",
    layout: "admin",
    minimumRole: "Owner",
    Icon: Storefront,
  },
  adminUserManagement: {
    id: "adminUserManagement",
    label: "จัดการบัญชีทั้งหมด",
    path: "/admin/setting/user-management",
    layout: "admin",
    minimumRole: "Owner",
    Icon: AddressBook,
  },
  adminTitleInShopOrder: {
    id: "adminTitleInShopOrder",
    label: "ออเดอร์ภายในร้าน",
    path: "/admin/order-management",
    layout: "admin",
    minimumRole: "Employee",
    Icon: Storefront,
  },
  cashierTableManagement: {
    id: "cashierTableManagement",
    label: "จัดการโต๊ะ",
    path: "/admin/table-management",
    layout: "admin",
    Icon: Chair,
    minimumRole: "Cashier",
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
  adminTitleShopManagement: {
    id: "adminTitleShopManagement",
    label: "จัดการบัญชีและร้านอาหาร",
    path: "/admin/account-management",
    layout: "admin",
    Icon: Gear,
    minimumRole: "Owner",
  },
} as const satisfies Record<string, PageMetaData>;

export type PagePath = (typeof pages)[keyof typeof pages]["path"];

export type PageId = keyof typeof pages;
