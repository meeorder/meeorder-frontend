import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import CategoryNav from "@/modules/menu/components/CategoryNav";
import WireFrame from "@/modules/mock/components/WireFrame";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>MeeOrder | Menu</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.home.id}>
        <CategoryNav />
        <WireFrame
          contentNode="Menu"
          cardColor="red"
          height={"calc(100vh - 110px - 64px)"}
        />
        <WireFrame
          contentNode="Menu"
          cardColor="red"
          height={"calc(100vh - 110px - 64px)"}
        />
      </AppLayout>
    </>
  );
}
