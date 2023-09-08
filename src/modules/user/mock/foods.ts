export type Food = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imagePath?: string;
};

export const foods: Food[] = [
  {
    id: "64ef35bde6c66d526b098205",
    name: "Chicken Rice",
    price: 35,
    description: "Chicken Rice",
    imagePath: "https://source.unsplash.com/random/?food&plate&11",
  },
  {
    id: "64ef35bde6c66d526b0981ff",
    name: "Fried Rice",
    price: 40,
    description: "Fried Rice",
    imagePath: "https://source.unsplash.com/random/?food&plate&22",
  },
  {
    id: "64ef35bde6c66d526b098203",
    name: "Fried Noodle",
    price: 45,
    description: "Fried Noodle",
    imagePath: "https://source.unsplash.com/random/?food&plate&33",
  },
  {
    id: "64ef35bde6c66d526b098201",
    name: "Fried Kuey Teow",
    price: 50,
    description: "Fried Kuey Teow",
    imagePath: "https://source.unsplash.com/random/?food&plate&44",
  },
];
