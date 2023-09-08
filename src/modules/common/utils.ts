export const checkImageSrc = (src: string) => {
  return src?.startsWith("http") || src?.startsWith("https")
    ? src
    : `https://source.unsplash.com/random/?food&plate&abc`;
};
