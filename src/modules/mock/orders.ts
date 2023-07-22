import { foods, type Food } from "@/modules/mock/foods";

export type OrderStatus =
  | "In queue"
  | "Preparing"
  | "Ready"
  | "Success"
  | "Cancel";

export type Order = {
  id: string;
  food: Food;
  status: OrderStatus;
};

export const orders: Order[] = [
  {
    id: "1",
    food: foods[0] as Food,
    status: "In queue",
  },
  {
    id: "2",
    food: foods[1] as Food,
    status: "Preparing",
  },
  {
    id: "3",
    food: foods[2] as Food,
    status: "Ready",
  },
  {
    id: "4",
    food: foods[3] as Food,
    status: "Success",
  },
  {
    id: "5",
    food: foods[0] as Food,
    status: "Cancel",
  },
];

export type PriceData = {
  orderPrice: number;
  discountPrice: number;
  totalPrice: number;
};

export type OrdersData = {
  id: string;
  orders: Order[];
  priceData: PriceData;
};

export const ordersData: OrdersData = {
  id: "abc",
  orders: orders,
  priceData: {
    orderPrice: 112,
    discountPrice: 99,
    totalPrice: 13,
  },
};
