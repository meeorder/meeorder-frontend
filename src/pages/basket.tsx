import AppLayout from "@/modules/AppLayout";
import { pages } from "@/modules/pageConfig";
import BasketFoodList from "@/modules/user/basket/components/BasketFoodList";
import BasketSummaryNav from "@/modules/user/basket/components/BasketSummaryNav";
import { inBasketOrders } from "@/modules/user/mock/orders";
import styled from "@emotion/styled";
import Head from "next/head";

const Basket = () => {
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
};

export default Basket;

const BasketMainContentWrapper = styled.div`
  padding-bottom: 80px;
  .ant-list-header {
    padding: 16px 24px;
  }
`;
