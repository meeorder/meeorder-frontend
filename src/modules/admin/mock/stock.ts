export type StockIngredientDataType = {
  id: string;
  key: React.Key;
  name: string;
  usedInMenu: number;
  available: boolean;
};

export const stockIngredientData: StockIngredientDataType[] = [];
for (let i = 1; i <= 20; i++) {
  stockIngredientData.push({
    name: `Ingredient ${i}`,
    id: i.toString(),
    key: i.toString(),
    usedInMenu: 20 - i,
    available: i % 2 === 0,
  });
}

export type StockAddOnDataType = {
  id: string;
  key: React.Key;
  name: string;
  usedInMenu: number;
  available: boolean;
};
export const stockAddonData: StockAddOnDataType[] = [];
for (let i = 1; i <= 20; i++) {
  stockAddonData.push({
    name: `AddOn ${i}`,
    id: i.toString(),
    key: i.toString(),
    usedInMenu: 20 - i,
    available: i % 2 === 0,
  });
}
