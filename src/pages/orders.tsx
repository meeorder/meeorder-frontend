import { pages } from "@/modules/config/pageConfig";
import AppLayout from "@/modules/layout/AppLayout";
import { ordersData } from "@/modules/mock/orders";
import OrderList from "@/modules/order/components/OrderList";
import OrderSummaryPrice from "@/modules/order/components/OrderSummaryPrice";
import styled from "@emotion/styled";
import { Typography } from "antd";
import Head from "next/head";

const tableNumber = 1; // from session

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
            <Typography.Title level={3}>Orders</Typography.Title>
            <Typography.Title level={5}>Table {tableNumber}</Typography.Title>
          </OrderTitle>
          <OrderList orders={ordersData.orders} />
          <OrderSummaryPrice priceData={ordersData.priceData} />
        </OrderContainer>
      </AppLayout>
    </>
  );
}

const OrderContainer = styled.div`
  padding: 24px;
`;

const OrderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
