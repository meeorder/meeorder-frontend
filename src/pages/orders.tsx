import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import WireFrame from "@/modules/mock/components/WireFrame";
import Head from "next/head";

export default function Orders() {
  return (
    <>
      <Head>
        <title>MeeOrder | Orders</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.orders.id}>
        <WireFrame
          contentNode="Orders"
          cardColor="blue"
          height={"calc(100vh - 64px - 64px)"}
        />
      </AppLayout>
    </>
  );
}
