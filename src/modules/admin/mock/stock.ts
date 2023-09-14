export type StockIngredientDataType = {
  id: string;
  key: React.Key;
  name: string;
  used_in_menu: number;
  can_use_ingredient: boolean;
};

export const stockIngredientData: StockIngredientDataType[] = [];
for (let i = 1; i <= 20; i++) {
  stockIngredientData.push({
    name: `Ingredient ${i}`,
    id: i.toString(),
    key: i.toString(),
    used_in_menu: 20 - i,
    can_use_ingredient: i % 2 === 0,
  });
}

export type StockAddOnDataType = {
  id: string;
  key: React.Key;
  name: string;
  used_in_menu: number;
  can_use_addon: boolean;
};
export const stockAddOnData: StockAddOnDataType[] = [];
for (let i = 1; i <= 20; i++) {
  stockIngredientData.push({
    name: `AddOn ${i}`,
    id: i.toString(),
    key: i.toString(),
    used_in_menu: 20 - i,
    can_use_ingredient: i % 2 === 0,
  });
}
