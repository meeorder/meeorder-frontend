import { type GetCategoryByIdResponse } from "@/modules/services/categories";

export type Category = GetCategoryByIdResponse;
export const categories: Category[] = [
  {
    _id: "id1",
    title: "test1",
    menus: [],
    rank: 1,
  },
  {
    _id: "id2",
    title: "test2",
    menus: ["test1", "test2"],
    rank: 2,
  },
  {
    _id: "id3",
    title: "test3",
    menus: [],
    rank: 3,
  },
  {
    _id: "id4",
    title: "test4",
    menus: [],
    rank: 4,
  },
];
