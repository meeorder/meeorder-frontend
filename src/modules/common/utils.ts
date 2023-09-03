export const commaFormat = (num: number | undefined) => {
  if (!num) return "0";

  const formated = Intl.NumberFormat("th-TH", {
    currency: "THB",
    style: "currency",
  }).format(num);

  return formated.slice(1, -3);
};
