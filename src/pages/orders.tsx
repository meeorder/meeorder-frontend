import AppLayout from "@/modules/AppLayout";
import { H4, H5 } from "@/modules/common/components/Typography";
import { pages } from "@/modules/pageConfig";
import OrderCoupon from "@/modules/user/coupon/OrderCoupon";
import { ordersData } from "@/modules/user/mock/orders";
import OrderList from "@/modules/user/order/components/OrderList";
import OrderSummaryPrice from "@/modules/user/order/components/OrderSummaryPrice";
import styled from "@emotion/styled";
import Head from "next/head";

const tableNumber = 10; // from session

const Orders = () => {
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
            <H5 type="secondary">Table {tableNumber}</H5>
          </OrderHeader>
          <OrderList orders={ordersData.orders} />
          <OrderCoupon />
          <OrderSummaryPrice priceData={ordersData.priceData} />
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
