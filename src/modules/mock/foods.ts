export type Food = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imagePath?: string;
};

export const foods: Food[] = [
  {
    id: "1",
    name: "Chicken Rice",
    price: 3.5,
    description: "Chicken Rice",
    imagePath: "https://fakeimg.pl/900x900/",
  },
  {
    id: "2",
    name: "Fried Rice",
    price: 3.5,
    description: "Fried Rice",
    imagePath: "https://fakeimg.pl/900x900/",
  },
  {
    id: "3",
    name: "Fried Noodle",
    price: 3.5,
    description: "Fried Noodle",
    imagePath: "https://fakeimg.pl/900x900/",
  },
  {
    id: "4",
    name: "Fried Kuey Teow",
    price: 3.5,
    description: "Fried Kuey Teow",
    imagePath: "https://fakeimg.pl/900x900/",
  },
];
