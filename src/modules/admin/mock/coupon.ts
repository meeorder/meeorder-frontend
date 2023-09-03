export type CouponDataType = {
  _id: string;
  title: string;
  discount: number;
  point: number;
  useableMenu: string[];
  numberOfUsedCoupons: number;
  numberOfCoupons: number;
  status: "published" | "draft";
};

export const couponData: CouponDataType[] = [
  {
    _id: "1",
    title: "Pork",
    discount: 20,
    point: 20,
    useableMenu: ["1", "3"],
    numberOfUsedCoupons: 50,
    numberOfCoupons: 100,
    status: "published",
  },
  {
    _id: "2",
    title: "Chicken",
    discount: 10,
    point: 10,
    useableMenu: ["1", "2", "3", "5"],
    numberOfUsedCoupons: 25,
    numberOfCoupons: 100,
    status: "published",
  },
  {
    _id: "3",
    title: "Beef",
    discount: 100,
    point: 100,
    useableMenu: ["1"],
    numberOfUsedCoupons: 90,
    numberOfCoupons: 100,
    status: "published",
  },
  {
    _id: "4",
    title: "Fish",
    discount: 10,
    point: 10,
    useableMenu: ["3"],
    numberOfUsedCoupons: 0,
    numberOfCoupons: 100,
    status: "draft",
  },
  {
    _id: "5",
    title: "Holy Basil",
    discount: 5,
    point: 5,
    useableMenu: ["1", "2", "3"],
    numberOfUsedCoupons: 0,
    numberOfCoupons: 20,
    status: "draft",
  },
];
