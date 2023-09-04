export type Coupon = {
  id: string;
  title: string;
  image: string;
  description: string;
  required_menus: number[];
  price: number;
  required_point: number;
  status: "inUsed" | "redeemable" | "disabled";
};

export const coupons: Coupon[] = [
  {
    id: "1",
    title: "ลดราคา 50 บาท",
    image: "https://picsum.photos/200/304",
    description: "Eat More Meow Meow Meow",
    required_menus: [1, 2],
    price: 50,
    required_point: 100,
    status: "inUsed",
  },
  {
    id: "2",
    title: "ลดราคา 50 บาท",
    image: "https://picsum.photos/200/305",
    description: "Eat More Meow Meow Meow",
    required_menus: [3, 4],
    price: 50,
    required_point: 200,
    status: "redeemable",
  },
  {
    id: "3",
    title: "ลดราคา 50 บาท",
    image: "https://picsum.photos/200/306",
    description: "Eat More Meow Meow Meow",
    required_menus: [5, 6],
    price: 50,
    required_point: 500,
    status: "redeemable",
  },
  {
    id: "4",
    title: "ลดราคา 50 บาท",
    image: "https://picsum.photos/200/307",
    description: "Eat More Meow Meow Meow",
    required_menus: [7, 8],
    price: 50,
    required_point: 1000,
    status: "redeemable",
  },
  {
    id: "5",
    title: "ลดราคา 50 บาท",
    image: "https://picsum.photos/200/308",
    description: "Eat More Meow Meow Meow",
    required_menus: [9, 10],
    price: 50,
    required_point: 10000,
    status: "disabled",
  },
  {
    id: "6",
    title: "ลดราคา 50 บาท",
    image: "https://picsum.photos/200/309",
    description: "Eat More Meow Meow Meow",
    required_menus: [11, 12],
    price: 50,
    required_point: 10000,
    status: "disabled",
  },
];
