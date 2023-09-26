import AppLayout from "@/modules/AppLayout";
import useAllCategory from "@/modules/admin/menu/hooks/useCategory";
import CancelOrderModal from "@/modules/admin/order/components/CancelOrderModal";
import OrderList from "@/modules/admin/order/components/OrderList";
import OrderModal from "@/modules/admin/order/components/OrderModal";
import PopOverFilter from "@/modules/admin/order/components/PopOverFilter";
import useAllOrders, {
  type AllOrdersData,
} from "@/modules/admin/order/hook/useAllOrders";
import { H1 } from "@/modules/common/components/Typography";
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
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);
  const [modalData, setModalData] = useState<GetAllOrdersResponse[number]>();
  const [filterCategory, setFliterCategory] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([
    "IN_QUEUE",
    "PREPARING",
    "READY_TO_SERVE",
    "DONE",
    "CANCELLED",
  ]);
  const [allOrderSource, setAllOrderSource] = useState<AllOrdersData>();
  useEffect(() => {
    setAllOrderSource(allOrder ?? []);
  }, [allOrder]);
  return (
    <AppLayout layoutType="admin" currentPageId="employeeOrderManagement">
      <Container>
        <PageHeader>
          <H1>ออเดอร์ภายในร้าน</H1>
          <PopOverFilter
            options={options}
            filterCategory={filterCategory}
            setFilterCategory={setFliterCategory}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </PageHeader>
        <OrderContainer>
          {allOrderStatus
            .filter(
              (status) => {
                if (filterStatus.length === 0) return true;
                return filterStatus.includes(status);
              },
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
        isCancleModalOpen={isCancleModalOpen}
        setIsCancleModalOpen={setIsCancleModalOpen}
      />
      <CancelOrderModal 
        setIsModalOpen={setIsModalOpen}
        isCancleModalOpen={isCancleModalOpen}
        setIsCancleModalOpen={setIsCancleModalOpen}
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
