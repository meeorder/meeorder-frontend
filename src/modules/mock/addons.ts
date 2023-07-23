export type Addon = {
  id: string;
  name: string;
  price: number;
};

export const addons: Addon[] = [
  {
    id: "1",
    name: "whip-cream",
    price: 20,
  },
  {
    id: "2",
    name: "Add honey",
    price: 5,
  },
  {
    id: "3",
    name: "With fresh blueberry",
    price: 14,
  },
];
