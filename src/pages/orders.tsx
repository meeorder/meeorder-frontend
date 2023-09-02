import AppLayout from "@/modules/AppLayout";
import { H4, H5 } from "@/modules/common/components/Typography";
import { pages } from "@/modules/pageConfig";
import OrderList from "@/modules/user/order/components/OrderList";
import OrderSummaryPrice from "@/modules/user/order/components/OrderSummaryPrice";
import useOrder from "@/modules/user/order/hooks/useOrder";
import { useSessionStore } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import Head from "next/head";

const Orders = () => {
  const session = useSessionStore((state) => state.session);
  const { data: ordersData } = useOrder(session?._id ?? "");

  return (
    <>
      <Head>
        <title>MeeOrder | Orders</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.orders.id}>
        <OrderContainer>
          <OrderHeader>
            <H4>My Order</H4>
            <H5 type="secondary">Table {session?.table}</H5>
          </OrderHeader>
          <OrderList
            orders={
              ordersData?.orders?.sort((a, b) =>
                (b?.created_at + b?._id).localeCompare(a?.created_at + a?._id),
              ) ?? []
            }
          />
          <OrderSummaryPrice
            priceData={{
              total_price: ordersData?.total_price ?? 0,
              discount_price: ordersData?.discount_price ?? 0,
              net_price: ordersData?.net_price ?? 0,
            }}
          />
        </OrderContainer>
      </AppLayout>
    </>
  );
};

export default Orders;

const OrderContainer = styled.div`
  background-color: ${(props) => props.theme.antd.colorBgLayout};
  min-height: calc(100vh - 128px);
  height: 100%;
  padding: 20px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-inline: 16px;
  padding-bottom: 8px;
`;
