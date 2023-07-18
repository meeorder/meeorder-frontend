import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import CategoryNav from "@/modules/menu/components/CategoryNav";
import { categories } from "@/modules/mock/categories";
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
        <CategoryNav categories={categories} />
        {categories.map((category, idx) => {
          return (
            <WireFrame
              style={{
                scrollMarginTop: "112px",
              }}
              id={category.key}
              key={category.key}
              contentNode={category.name + " menu"}
              cardColor={`hsl(${idx * 50 + 50}, 100%, 30%)`}
              height={"calc(100vh - 110px - 64px)"}
            />
          );
        })}
      </AppLayout>
    </>
  );
}
