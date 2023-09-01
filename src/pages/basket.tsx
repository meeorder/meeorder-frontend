import AppLayout from "@/modules/AppLayout";
import { pages } from "@/modules/pageConfig";
import BasketFoodList from "@/modules/user/basket/components/BasketFoodList";
import BasketSummaryNav from "@/modules/user/basket/components/BasketSummaryNav";
import { useBasketStore } from "@/modules/user/basket/hooks/useBasketStore";
import { calculateBasketOrdersPrice } from "@/modules/user/basket/utils";
import styled from "@emotion/styled";
import Head from "next/head";
import { useEffect, useState } from "react";

const Basket = () => {
  const basketOrders = useBasketStore((state) => state.basketOrders);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>MeeOrder | Basket</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.basket.id}>
        <BasketMainContentWrapper>
          <BasketFoodList basketOrders={isLoaded ? basketOrders : []} />
          <BasketSummaryNav
            totalPrice={isLoaded ? calculateBasketOrdersPrice(basketOrders) : 0}
          />
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
