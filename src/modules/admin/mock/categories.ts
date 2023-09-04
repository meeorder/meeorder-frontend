import { type GetCategoryByIdResponse } from "@/modules/services/categories";

export type Category = GetCategoryByIdResponse;
export const categories: Category[] = [
  {
    _id: "id1",
    title: "test1",
    menus: ["menu2"],
    rank: 1,
  },
  {
    _id: "id2",
    title: "test2",
    menus: ["menu1", "menu22"],
    rank: 2,
  },
  {
    _id: "id3",
    title: "test3",
    menus: ["menu10", "menu32"],
    rank: 3,
  },
  {
    _id: "id4",
    title: "test4",
    menus: ["menu6", "menu55"],
    rank: 4,
  },
  {
    _id: "id5",
    title: "test5",
    menus: ["menu7", "menu8", "menu9", "menu12"],
    rank: 5,
  },
  {
    _id: "id6",
    title: "test6",
    menus: [],
    rank: 6,
  },
  {
    _id: "id7",
    title: "test7",
    menus: [],
    rank: 7,
  },
  {
    _id: "id8",
    title: "test8",
    menus: [],
    rank: 8,
  },
  {
    _id: "id9",
    title: "test9",
    menus: [],
    rank: 9,
  },
  {
    _id: "id10",
    title: "test10",
    menus: [],
    rank: 10,
  },
  {
    _id: "id11",
    title: "test11",
    menus: [],
    rank: 11,
  },
  {
    _id: "id12",
    title: "test12",
    menus: [],
    rank: 12,
  },
];
