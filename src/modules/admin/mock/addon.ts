export type AddOnDataType = {
  id: string;
  key: React.Key;
  title: string;
  price: number;
};

export type AddOnModalDataType = {
  id: string;
  key: React.Key;
  title: string;
  price: number;
};

export const addOnData: AddOnDataType[] = [];
for (let i = 1; i <= 8; i++) {
  addOnData.push({
    title: `Add-on ${i}`,
    id: i.toString(),
    key: i.toString(),
    price: 100,
  });
}

export const addOnModalData: AddOnModalDataType[] = [];
for (let i = 1; i <= 20; i++) {
  addOnModalData.push({
    title: `Add-On-Modal ${i}`,
    id: i.toString(),
    key: i.toString(),
    price: 100,
  });
}
