import customTheme from "@/styles/antDesignTheme";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { ConfigProvider, theme } from "antd";
import { type AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { token } = theme.useToken();
  return (
    <ConfigProvider theme={customTheme}>
      <ThemeProvider
        theme={{
          antd: token,
        }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default MyApp;
