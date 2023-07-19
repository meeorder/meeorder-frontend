export type Food = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
};

export const foods: Food[] = [
  {
    id: "1",
    name: "Chicken Rice",
    price: 3.5,
    description: "Chicken Rice",
    image: "https://fakeimg.pl/100x100/",
  },
  {
    id: "2",
    name: "Fried Rice",
    price: 3.5,
    description: "Fried Rice",
    image: "https://fakeimg.pl/100x100/",
  },
  {
    id: "3",
    name: "Fried Noodle",
    price: 3.5,
    description: "Fried Noodle",
    image: "https://fakeimg.pl/100x100/",
  },
  {
    id: "4",
    name: "Fried Kuey Teow",
    price: 3.5,
    description: "Fried Kuey Teow",
    image: "https://fakeimg.pl/100x100/",
  },
];
