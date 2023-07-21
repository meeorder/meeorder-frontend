import { foods, type Food } from "@/modules/mock/foods";

export type OrderStatus =
  | "in queue"
  | "preparing"
  | "ready to serve"
  | "success"
  | "cancel";

export type Order = {
  id: string;
  food: Food;
  status: OrderStatus;
};

export const orders: Order[] = [
  {
    id: "1",
    food: foods[0] as Food,
    status: "in queue",
  },
  {
    id: "2",
    food: foods[1] as Food,
    status: "preparing",
  },
  {
    id: "3",
    food: foods[2] as Food,
    status: "ready to serve",
  },
  {
    id: "4",
    food: foods[3] as Food,
    status: "success",
  },
  {
    id: "5",
    food: foods[0] as Food,
    status: "cancel",
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
    discountPrice: 13,
    totalPrice: 99,
  },
};
