import { type LayoutType } from "@/modules/layout/types";
import { Basket, ClipboardText, House } from "@phosphor-icons/react";

type PageMetaData = {
  id: string;
  label: string;
  description?: string;
  path: string;
  layout: LayoutType;
  Icon: React.FC;
};

export const pages = {
  home: {
    id: "home",
    label: "Home",
    description: "Food menu page",
    path: "/",
    layout: "user",
    Icon: House,
  },
  basket: {
    id: "basket",
    label: "Basket",
    description: "basket page",
    path: "/basket",
    layout: "user",
    Icon: Basket,
  },
  orders: {
    id: "orders",
    label: "My Orders",
    description: "my orders page",
    path: "/orders",
    layout: "user",
    Icon: ClipboardText,
  },
} as const satisfies Record<string, PageMetaData>;

export type AllPath = (typeof pages)[keyof typeof pages]["path"];
