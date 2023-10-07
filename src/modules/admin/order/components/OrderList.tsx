import OrderListCard from "@/modules/admin/order/components/OrderListCard";
import { H4 } from "@/modules/common/components/Typography";
import { transientOptions } from "@/modules/common/transientOptions";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import {
  orderStatusTranslation,
  type OrderStatus,
} from "@/pages/admin/order-management";
import styled from "@emotion/styled";
import { Badge, Card, theme } from "antd";

type OrderListCardProps = {
  status: OrderStatus;
  orders: GetAllOrdersResponse;
  setIsModalOpen: (value: boolean) => void;
  setModalData: (value: GetAllOrdersResponse[number]) => void;
};

const OrderList: React.FC<OrderListCardProps> = ({
  status,
  orders,
  setIsModalOpen,
  setModalData,
}) => {
  const { token } = theme.useToken();
  const badgeColor = {
    IN_QUEUE: token["orange-5"],
    PREPARING: token["geekblue-5"],
    READY_TO_SERVE: token["blue-5"],
    DONE: token["green-5"],
    CANCELLED: token["red-5"],
  };
  const headerColor = {
    IN_QUEUE: token["orange-1"],
    PREPARING: token["geekblue-1"],
    READY_TO_SERVE: token["blue-1"],
    DONE: token["green-1"],
    CANCELLED: token["red-1"],
  };
  const borderColor = {
    IN_QUEUE: token["orange-3"],
    PREPARING: token["geekblue-3"],
    READY_TO_SERVE: token["blue-3"],
    DONE: token["green-3"],
    CANCELLED: token["red-3"],
  };
  const textColor = {
    IN_QUEUE: token["orange-6"],
    PREPARING: token["geekblue-6"],
    READY_TO_SERVE: token["blue-6"],
    DONE: token["green-6"],
    CANCELLED: token["red-6"],
  };

  return (
    <StyledCard
      title={
        <CardTitle $textColor={textColor[status]}>
          {orderStatusTranslation[status]}
        </CardTitle>
      }
      extra={
        <StyledBadge
          count={orders?.length}
          $badgeColor={badgeColor[status]}
          color={badgeColor[status]}
          showZero
        />
      }
      $borderColor={borderColor[status]}
      $headerColor={headerColor[status]}
    >
      {orders.map((order) => {
        return (
          <OrderListCard
            setIsModalOpen={setIsModalOpen}
            setModalData={setModalData}
            order={order}
            key={order._id}
            color={borderColor[status] ?? "white"}
          />
        );
      })}
    </StyledCard>
  );
};

export default OrderList;

const StyledCard = styled(Card, transientOptions)<{
  $borderColor: string;
  $headerColor: string;
}>`
  min-width: 160px !important;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 144px);
  border: 1px solid;
  border-color: ${(props) => props.$borderColor};
  .ant-card-body {
    flex: 1;
    overflow-y: auto;
    padding: 0;
  }
  .ant-card-head {
    background-color: ${(props) => props.$headerColor};
    border-bottom: 1px solid;
    border-color: ${(props) => props.$borderColor};
  }
`;
const StyledBadge = styled(Badge, transientOptions)<{ $badgeColor: string }>`
  .ant-badge-count {
    box-shadow: 0 0 0 1px ${(props) => props.$badgeColor};
  }
`;
const CardTitle = styled(H4, transientOptions)<{ $textColor: string }>`
  color: ${(props) => props.$textColor} !important;
  width: 100%;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
`;
