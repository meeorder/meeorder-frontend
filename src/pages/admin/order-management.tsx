import AppLayout from "@/modules/AppLayout";
import useAllCategory from "@/modules/admin/menu/hooks/useCategory";
import OrderList from "@/modules/admin/order/components/OrderList";
import useAllOrders, {
  type AllOrdersData,
} from "@/modules/admin/order/hook/useAllOrders";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H1 } from "@/modules/common/components/Typography";
import { type OrdersWithPriceData } from "@/modules/user/order/hooks/useOrder";
import styled from "@emotion/styled";
import { Funnel } from "@phosphor-icons/react";
import { Button, Divider, Popover, Select, type SelectProps } from "antd";
import { useEffect, useState } from "react";

const OrderManagement = () => {
  const { data: allOrder } = useAllOrders();
  const { data: allCategory } = useAllCategory();
  const options: SelectProps["options"] = allCategory?.map((category) => ({
    label: category.title,
    value: category._id,
  }));
  const [changeOptions, setChangeOptions] = useState<string[]>([]);
  const [filterOrder, setFliterOrder] = useState<string[]>([]);
  const [allOrderSource, setAllOrderSource] = useState<AllOrdersData>();
  useEffect(() => {
    setAllOrderSource(allOrder ?? []);
  }, [allOrder]);
  return (
    <AppLayout layoutType="admin" currentPageId="employeeOrderManagement">
      <Container>
        <PageHeader>
          <H1>ออเดอร์ภายในร้าน</H1>
          <StyledPopover
            placement="bottomRight"
            trigger="click"
            title={
              <>
                <div>ตัวเลือกแสดงข้อมูล:</div>
                <Divider style={{ margin: "8px" }} />
              </>
            }
            content={
              <StyledContentContainer>
                <StyledSelectSection>
                  <div>Category</div>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "25vw" }}
                    options={options}
                    onChange={(value: string[]) => {
                      setChangeOptions(value);
                    }}
                  />
                </StyledSelectSection>
                <BottonGroup>
                  <Button>save</Button>
                  <Button>cancel</Button>
                  <Button>reset</Button>
                </BottonGroup>
              </StyledContentContainer>
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
                  allOrderSource?.filter((order) => order.status === status) ??
                  [],
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

const StyledSelectSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  margin-top: 12px;
`;

const BottonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
`;

const StyledPopover = styled(Popover)`
  position: relative;
`;

const StyledContentContainer = styled.div`
  width: 100%;
`;
