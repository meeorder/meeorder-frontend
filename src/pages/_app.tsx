import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "antd";
import { type AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { token } = theme.useToken();
  return (
    <ThemeProvider
      theme={{
        antd: token,
      }}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
