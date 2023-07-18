export type Category = {
  name: string;
  id: string;
};

export const categories: readonly Category[] = [
  { name: "Recommended", id: "recommended" },
  { name: "On Sale", id: "on-sale" },
  { name: "Drinks", id: "drinks" },
  { name: "Sour lover", id: "sour-lover" },
  { name: "Spice up!", id: "spice-up" },
  { name: "Sweet", id: "sweet-tooth" },
] as const;

export const RECOMMEND_CATEGORY_ID = "recommended";
