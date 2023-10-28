import { type ThemeConfig } from "antd";
import { Noto_Sans_Thai } from "next/font/google";
const noto_font = Noto_Sans_Thai({ subsets: ["latin"] });

const customTheme: ThemeConfig = {
  components: {
    Typography: {
      titleMarginTop: "0px",
      titleMarginBottom: "0px",
    },
  },
  token: {
    fontFamily: noto_font.style.fontFamily,
  },
};

export default customTheme;
