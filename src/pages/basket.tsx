import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import WireFrame from "@/modules/mock/components/WireFrame";
import Head from "next/head";

export default function Basket() {
  return (
    <>
      <Head>
        <title>MeeOrder | Basket</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" nowPageId={pages.basket.id}>
        <WireFrame
          contentNode="Basket"
          cardColor="green"
          height={"calc(100vh - 64px - 64px)"}
        />
      </AppLayout>
    </>
  );
}
