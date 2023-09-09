export const commaFormat = (num: number | undefined) => {
  if (!num) return "0";

  const formated = Intl.NumberFormat("th-TH", {
    currency: "THB",
    style: "currency",
  }).format(num);

  return formated.slice(1, -3);
};

export const checkImageSrc = (src: string) => {
  return src?.startsWith("http") || src?.startsWith("https")
    ? src
    : `https://source.unsplash.com/random/?food&plate&abc`;
<<<<<<< HEAD
};

export const tuncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
=======
>>>>>>> develop
};
