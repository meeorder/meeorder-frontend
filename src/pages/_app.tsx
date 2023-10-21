import customTheme from "@/styles/antDesignTheme";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import locale from "antd/locale/th_TH";
import { type AppType } from "next/dist/shared/lib/utils";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const { token } = theme.useToken();
  return (
    <ConfigProvider theme={customTheme} locale={locale}>
      <ThemeProvider
        theme={{
          antd: token,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default MyApp;
