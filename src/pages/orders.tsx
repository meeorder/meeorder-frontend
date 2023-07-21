import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import { ordersData } from "@/modules/mock/orders";
import OrderList from "@/modules/order/components/OrderList";
import OrderSummaryPrice from "@/modules/order/components/OrderSummaryPrice";
import styled from "@emotion/styled";
import { Typography } from "antd";
import Head from "next/head";

const tableNumber = 10; // from session

export default function Orders() {
  return (
    <>
      <Head>
        <title>MeeOrder | Orders</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType="user" currentPageId={pages.orders.id}>
        <OrderContainer>
          <OrderTitle>
            <StyleMyOrderText>My Order</StyleMyOrderText>
            <StyleMyTableText>Table {tableNumber}</StyleMyTableText>
          </OrderTitle>
          <OrderList orders={ordersData.orders} />
          <OrderSummaryPrice priceData={ordersData.priceData} />
        </OrderContainer>
      </AppLayout>
    </>
  );
}

const OrderContainer = styled.div`
  background: var(--neutral-2, #fafafa);
  padding: 24px;
`;

const OrderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-inline: 16px;
  padding-top: 24px;
  padding-bottom: 8px;
`;

const StyleMyOrderText = styled(Typography.Text)`
  color: var(--character-primary-85, rgba(0, 0, 0, 0.85));
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

const StyleMyTableText = styled(Typography.Text)`
  color: var(--character-secondary-45, rgba(0, 0, 0, 0.45));
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;
