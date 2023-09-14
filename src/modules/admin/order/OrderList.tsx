import OrderListCard from "@/modules/admin/order/OrderListCard";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { type OrderStatus } from "@/pages/admin/order-management";
import styled from "@emotion/styled";
import { Badge, Card } from "antd";

type OrderListCardProps = {
  status: OrderStatus;
  orders: GetAllOrdersResponse;
};

const badgeColor = {
  IN_QUEUE: "#FFA940",
  PREPARING: "#597EF7",
  READY_TO_SERVE: "#40A9FF",
  DONE: "#73D13D",
  CANCEL: "#FF4D4F",
};

const OrderList: React.FC<OrderListCardProps> = ({ status, orders }) => {
  return (
    <StyledCard
      status={status}
      title={<div>{status}</div>}
      extra={
        <Badge count={orders?.length} color={badgeColor[status]} showZero />
      }
    >
      {orders.map((order) => {
        return (
          <OrderListCard
            order={order}
            key={order._id}
            color={badgeColor[status]}
          />
        );
      })}
    </StyledCard>
  );
};

export default OrderList;

const StyledCard = styled(Card)<{ status: OrderStatus }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 144px);
  border: 1px solid green;
  .ant-card-body {
    flex: 1;
    overflow-y: auto;
    padding: 0;
  }
  .ant-card-head {
    background-color: ${(props) => badgeColor[props.status]};
  }
`;
