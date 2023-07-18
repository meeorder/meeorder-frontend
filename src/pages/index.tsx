import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import Category from "@/modules/menu/components/Category";
import CategoryNav from "@/modules/menu/components/CategoryNav";
import { categories } from "@/modules/mock/categories";
import { foods } from "@/modules/mock/foods";
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

        {categories.map((category) => {
          return (
            <Category key={category?.id} category={category} foods={foods} />
          );
        })}
      </AppLayout>
    </>
  );
}
