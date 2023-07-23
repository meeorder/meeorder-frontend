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

type Addon = {
  id: string;
  name: string;
  price: number;
};

export type BasketOrder = {
  id: string;
  food: Food;
  quantity: number;
  addons?: Addon[];
};

export const inBasketOrders: BasketOrder[] = [
  {
    id: "1",
    food: foods[0] as Food,
    quantity: 1,
    addons: [
      {
        id: "1",
        name: "Add egg",
        price: 0.5,
      },
      {
        id: "2",
        name: "Add chicken",
        price: 1.5,
      },
    ],
  },
  {
    id: "2",
    food: foods[1] as Food,
    quantity: 2,
    addons: [
      {
        id: "1",
        name: "Add egg",
        price: 0.5,
      },
      {
        id: "3",
        name: "Add penguin",
        price: 1.5,
      },
      {
        id: "4",
        name: "Add cat",
        price: 1.5,
      },
      {
        id: "5",
        name: "Add dog",
        price: 1.5,
      },
    ],
  },
  {
    id: "3",
    food: foods[2] as Food,
    quantity: 3,
    addons: [
      {
        id: "1",
        name: "Add egg",
        price: 0.5,
      },
      {
        id: "2",
        name: "Add chicken",
        price: 1.5,
      },
    ],
  },
  {
    id: "4",
    food: foods[3] as Food,
    quantity: 4,
  },
  {
    id: "5",
    food: foods[0] as Food,
    quantity: 5,
    addons: [
      {
        id: "1",
        name: "Add egg",
        price: 0.5,
      },
    ],
  },
];
