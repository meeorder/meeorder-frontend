import BasketFoodList from "@/modules/basket/components/BasketFoodList";
import BasketSummaryNav from "@/modules/basket/components/BasketSummaryNav";
import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import { inBasketOrders } from "@/modules/mock/orders";
import styled from "@emotion/styled";
import Head from "next/head";
export default function Basket() {
  return (
    <>
      <Head>
        <title>MeeOrder | Basket</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.basket.id}>
        <BasketMainContentWrapper>
          <BasketFoodList orders={inBasketOrders} />
          <BasketSummaryNav totalPrice={999} />
        </BasketMainContentWrapper>
      </AppLayout>
    </>
  );
}

const BasketMainContentWrapper = styled.div`
  padding-bottom: 80px;
  .ant-list-header {
    padding: 16px 24px;
  }
`;
