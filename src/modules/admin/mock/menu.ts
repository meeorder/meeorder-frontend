type Menu = {
  _id: string;
  title: string;
  category: string;
};

type Category = {
  _id: string;
  title: string;
  rank: number;
};

type AllCategories = {
  category: Category;
  menu: Menu[];
}[];

export type GetAllMenusResponse = Menu[];

export const getAllMenus: AllCategories = [
  {
    category: {
      _id: "category_id1",
      title: "category_id1",
      rank: 1,
    },
    menu: [
      {
        _id: "menu_id1",
        title: "menu_test1",
        category: "category_id1",
      },
      {
        _id: "menu_id2",
        title: "menu_test2",
        category: "category_id2",
      },
    ],
  },
  {
    category: {
      _id: "category_id2",
      title: "category_id2",
      rank: 2,
    },
    menu: [
      {
        _id: "menu_id3",
        title: "menu_test3",
        category: "category_id2",
      },
      {
        _id: "menu_id4",
        title: "menu_test4",
        category: "category_id2",
      },
    ],
  },
  {
    category: {
      _id: "category_id3",
      title: "category_id3",
      rank: 3,
    },
    menu: [
      {
        _id: "menu_id5",
        title: "menu_test5",
        category: "category_id3",
      },
      {
        _id: "menu_id6",
        title: "menu_test6",
        category: "category_id3",
      },
    ],
  },
];
