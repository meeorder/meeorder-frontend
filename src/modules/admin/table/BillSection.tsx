import { useSelectedTableStore } from "@/modules/admin/table/hooks/useSelectedTableStore";
import { useGetOrdersByTableId } from "@/modules/admin/table/hooks/useSessionBill";
import { H2, H3, Text } from "@/modules/common/components/Typography";
import { type GetOrdersBySessionIdResponse } from "@/modules/services/sessions";
import styled from "@emotion/styled";
import { PencilSimpleLine, Printer } from "@phosphor-icons/react";
import { Button, ConfigProvider, Divider, Empty, QRCode, theme } from "antd";
import React from "react";

const RenderOrder: React.FC<{
  order: GetOrdersBySessionIdResponse["orders"][number];
}> = ({ order }) => {
  const priceWithAddons =
    order.menu.price +
    order.addons.reduce((acc, addon) => acc + addon.price, 0);
  return (
    <div key={order._id}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text>{order.menu.title}</Text>
        <Text>{priceWithAddons}</Text>
      </div>
      {order?.addons?.map((addon) => (
        <Text
          style={{ display: "block", textIndent: "20px" }}
          key={order._id + addon._id}
        >
          + {addon.title} {addon.price}
        </Text>
      ))}
    </div>
  );
};

const BillSection = () => {
  const { tableId, mode } = useSelectedTableStore();
  const { data: bill } = useGetOrdersByTableId(tableId);
  const orders = bill?.orders.filter((order) => order.status !== "CANCELLED");
  const unfinishedOrders = orders?.filter((order) => order.status !== "DONE");
  const finishedOrders = orders?.filter((order) => order.status === "DONE");
  const {
    token: { colorSuccess },
  } = theme.useToken();
  /* ------------------------------ In edit mode ------------------------------ */
  if (mode === "edit") {
    return (
      <BillContainer>
        <Empty
          style={{ margin: "auto" }}
          description="อยู่ในโหมดแก้ไขโต๊ะ"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </BillContainer>
    );
  }
  /* ------------------------------ Not selected ------------------------------ */
  if (tableId === "") {
    return (
      <BillContainer>
        <Empty
          style={{ margin: "auto" }}
          description="กรุณาเลือกโต๊ะ"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </BillContainer>
    );
  }
  return (
    <BillContainer>
      <HeadSection>
        <QRCode size={83} value="-" color="white" />
        <div style={{ flex: 1, justifySelf: "center", textAlign: "center" }}>
          <H2>TName</H2>
          <Text>status</Text>
        </div>
        <div style={{ textAlign: "end" }}>
          <Text>time</Text>
          <Text>count time</Text>
        </div>
      </HeadSection>
      <BillOrdersSection>
        {!!unfinishedOrders?.length && (
          <>
            <Divider style={{ margin: 0 }}>เมนูที่ยังไม่สำเร็จ</Divider>
            {unfinishedOrders?.map((order) => {
              return <RenderOrder key={order._id} order={order} />;
            })}
            <Divider />
          </>
        )}
        {finishedOrders?.map((order) => {
          return <RenderOrder key={order._id} order={order} />;
        })}
        {/* TODO Render Discount */}
        {/* {bill?.discount_price} */}
      </BillOrdersSection>
      <ActionSection>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <H3>ยอดรวม</H3>
          <H3>{bill?.net_price} บาท</H3>
        </div>
        <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
          <Button block size="large" icon={<Printer />}>
            ปริ๊นใบเสร็จ
          </Button>
          <Button block size="large" icon={<PencilSimpleLine />}>
            แก้ไขออเดอร์
          </Button>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: colorSuccess,
            },
          }}
        >
          <Button block size="large" type="primary">
            ชำระเงิน
          </Button>
        </ConfigProvider>
      </ActionSection>
    </BillContainer>
  );
};

export default BillSection;

const BillContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 390px;
`;
const HeadSection = styled.div`
  height: 143px;
  background-color: lightcoral;
  padding: 20px;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
`;

const BillOrdersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-inline: 20px;
  padding-block: 8px;
  height: 100%;
  flex: 1;
  overflow-y: auto;
`;

const ActionSection = styled.div`
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.15);
  padding: 20px;
`;
