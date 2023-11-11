import AppLayout from "@/modules/AppLayout";
import useAllCategory from "@/modules/admin/menu/hooks/useCategory";
import CancelOrderModal from "@/modules/admin/order/components/CancelOrderModal";
import OrderList from "@/modules/admin/order/components/OrderList";
import OrderModal from "@/modules/admin/order/components/OrderModal";
import PopOverFilter from "@/modules/admin/order/components/PopOverFilter";
import useAllOrders, {
  type AllOrdersData,
} from "@/modules/admin/order/hook/useAllOrders";
import { useFilterCategory } from "@/modules/admin/order/hook/useFilterCategory";
import { useFilterStatus } from "@/modules/admin/order/hook/useFilterStatus";
import { H1 } from "@/modules/common/components/Typography";
import { useClient } from "@/modules/common/hooks/useClient";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { type OrdersWithPriceData } from "@/modules/user/order/hooks/useOrder";
import styled from "@emotion/styled";
import { type SelectProps } from "antd";
import { useEffect, useState } from "react";
const OrderManagement = () => {
  const { data: allOrder } = useAllOrders();
  const { data: allCategory } = useAllCategory();
  const options: SelectProps["options"] = allCategory?.map((category) => ({
    label: category.title,
    value: category.title,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [modalData, setModalData] = useState<GetAllOrdersResponse[number]>();
  const { isClientLoaded } = useClient();
  const [filterStatus] = useFilterStatus((state) => [state.filterStatus]);
  const [filterCategory] = useFilterCategory((state) => [state.filterCategory]);
  const [allOrderSource, setAllOrderSource] = useState<AllOrdersData>();
  useEffect(() => {
    setAllOrderSource(allOrder ?? []);
  }, [allOrder]);
  if (!isClientLoaded) return null;
  return (
    <AppLayout layoutType="admin" currentPageId="employeeOrderManagement">
      <Container>
        <PageHeader>
          <H1>ออเดอร์ภายในร้าน</H1>
          <PopOverFilter options={options} />
        </PageHeader>
        <OrderContainer>
          {allOrderStatus
            .filter((status) => {
              if (filterStatus.length === 0) return true;
              return filterStatus.includes(status);
            })
            .map((status) => {
              return {
                status,
                orders:
                  allOrderSource?.filter((order) => order.status === status) ??
                  [],
              };
            })
            .map(({ status, orders }) => {
              return {
                status,
                orders: orders.filter((order) => {
                  if (filterCategory.length === 0) return true;
                  return filterCategory.includes(
                    order.menu.category?.title ?? "Not Found",
                  );
                }),
              };
            })
            .map(({ status, orders }) => (
              <OrderList
                key={status}
                status={status}
                orders={orders}
                setIsModalOpen={setIsModalOpen}
                setModalData={setModalData}
              />
            ))}
        </OrderContainer>
      </Container>
      <OrderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalData={modalData}
        setIsCancelModalOpen={setIsCancelModalOpen}
      />
      <CancelOrderModal
        setIsModalOpen={setIsModalOpen}
        isCancelModalOpen={isCancelModalOpen}
        setIsCancelModalOpen={setIsCancelModalOpen}
        modalData={modalData}
      />
    </AppLayout>
  );
};

export default OrderManagement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  height: calc(100dvh - 48px);
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
  height: 0vh;
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
