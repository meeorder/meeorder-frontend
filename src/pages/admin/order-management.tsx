import AppLayout from "@/modules/AppLayout";
import OrderList from "@/modules/admin/order/OrderList";
import useAllOrders from "@/modules/admin/order/hook/useAllOrders";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H1 } from "@/modules/common/components/Typography";
import { type OrdersWithPriceData } from "@/modules/user/order/hooks/useOrder";
import styled from "@emotion/styled";
import { Funnel } from "@phosphor-icons/react";
import { Popover } from "antd";

const OrderManagement = () => {
  const { data: allOrder } = useAllOrders();
  console.log("allOrder:", allOrder);
  return (
    <AppLayout layoutType="admin" currentPageId="employeeOrderManagement">
      <Container>
        <PageHeader>
          <H1>ออเดอร์ภายในร้าน</H1>
          <StyledPopover
            trigger="click"
            placement="bottomRight"
            content={
              <StyledContent>
                <h1>ตัวเลือกแสดงข้อมูล</h1>
                <p>Content</p>
                <p>Content</p>
              </StyledContent>
            }
          >
            <CenterContentButton
              type="primary"
              shape="round"
              icon={<Funnel size={16} />}
            >
              ตัวเลือกแสดงข้อมูล
            </CenterContentButton>
          </StyledPopover>
        </PageHeader>
        <OrderContainer>
          {allOrderStatus
            .filter(
              (status) => status,
              // todo: filter order status by selected status
            )
            .map((status) => {
              // allOrder.filter((order) => order.status === status)
              return {
                status,
                orders:
                  allOrder?.filter((order) => order.status === status) ?? [],
              };
            })
            .map(({ status, orders }) => (
              <OrderList key={status} status={status} orders={orders} />
            ))}
        </OrderContainer>
      </Container>
    </AppLayout>
  );
};

export default OrderManagement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  height: calc(100vh - 48px);
  overflow: hidden;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  height: 48px;
`;

const OrderContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
`;

export type OrderStatus = OrdersWithPriceData["orders"][number]["status"];

export const allOrderStatus = [
  "IN_QUEUE",
  "PREPARING",
  "READY_TO_SERVE",
  "DONE",
  "CANCELLED",
] as const satisfies Readonly<OrderStatus[]>;

export const orderStatusTranslation: Record<OrderStatus, string> = {
  IN_QUEUE: "อยู่ในคิว",
  PREPARING: "กำลังเตรียมอาหาร",
  READY_TO_SERVE: "พร้อมเสิร์ฟ",
  DONE: "เสร็จสิ้น",
  CANCELLED: "ยกเลิก",
};

const StyledPopover = styled(Popover)`
  .ant-popover-inner{
    padding: 0 !important;
  }
`;

const StyledContent = styled.div`
  h1 {
    width: 100%;
    font-size: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`