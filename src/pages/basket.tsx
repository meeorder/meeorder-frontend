import AppLayout from "@/modules/AppLayout";
import { useClient } from "@/modules/common/hooks/useClient";
import { pages } from "@/modules/pageConfig";
import BasketFoodList from "@/modules/user/basket/components/BasketFoodList";
import BasketSummaryNav from "@/modules/user/basket/components/BasketSummaryNav";
import { useBasketStore } from "@/modules/user/basket/hooks/useBasketStore";
import { calculateBasketOrdersPrice } from "@/modules/user/basket/utils";
import { useSession } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import Head from "next/head";

const Basket = () => {
  const basketOrders = useBasketStore((state) => state.basketOrders);
  const { isClientLoaded } = useClient();
  useSession();

  return (
    <>
      <Head>
        <title>MeeOrder | Basket</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.basket.id}>
        {isClientLoaded && (
          <BasketMainContentWrapper>
            <BasketFoodList basketOrders={basketOrders} />

            <BasketSummaryNav
              totalPrice={calculateBasketOrdersPrice(basketOrders)}
            />
          </BasketMainContentWrapper>
        )}
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
