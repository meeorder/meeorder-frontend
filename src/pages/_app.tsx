import customTheme from "@/styles/antDesignTheme";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import locale from "antd/locale/th_TH";
import { type AppType } from "next/dist/shared/lib/utils";
import { Noto_Sans_Thai } from "next/font/google";
import Head from "next/head";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const noto_font = Noto_Sans_Thai({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  const { token } = theme.useToken();
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="1xqNO98PgOPVLeYc8xbaLQgN0lqBDnUSPAVD_-ur_3o"
        />
      </Head>
      <ConfigProvider theme={customTheme} locale={locale}>
        <ThemeProvider
          theme={{
            antd: token,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <main className={noto_font.className}>
              <Component {...pageProps} />
            </main>
          </QueryClientProvider>
        </ThemeProvider>
      </ConfigProvider>
    </>
  );
};

export default MyApp;
