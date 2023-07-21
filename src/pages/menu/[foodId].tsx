import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import { foods } from "@/modules/mock/foods";
import Head from "next/head";
import { useRouter } from "next/router";

export default function FoodDetail() {
  const router = useRouter();
  const { foodId } = router.query;

  const food = foods.find((food) => food.id === foodId);

  return (
    <>
      <Head>
        <title>MeeOrder | Menu</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.home.id}>
        {food && (
          <div>
            <div key={food?.id}>
              <h2>{food?.name}</h2>
              <p>{food?.id}</p>
              <p>{food?.description}</p>
              <p>{food?.price}</p>
            </div>
            <h1>Food Detail</h1>
          </div>
        )}
      </AppLayout>
    </>
  );
}
