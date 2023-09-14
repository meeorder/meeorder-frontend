import OrderListCard from "@/modules/admin/order/OrderListCard";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { OrdersWithPriceData } from "@/modules/user/order/hooks/useOrder";
import {
  orderStatusTranslation,
  type OrderStatus,
} from "@/pages/admin/order-management";
import { orange,blue,geekblue,green,red } from "@ant-design/colors";
import styled from "@emotion/styled";
import { Badge, Card } from "antd";


type Order = OrdersWithPriceData["orders"][number];

type OrderListCardProps = {
  status: OrderStatus;
  orders: GetAllOrdersResponse;
};

const badgeColor = {
  IN_QUEUE: orange[5],
  PREPARING: geekblue[5],
  READY_TO_SERVE: blue[5],
  DONE: green[5],
  CANCELLED: red[5],
};
const headerColor = {
  IN_QUEUE: orange[1],
  PREPARING: geekblue[1],
  READY_TO_SERVE: blue[1],
  DONE: green[1],
  CANCELLED: red[1],
};
const borderColor = {
  IN_QUEUE: orange[3],
  PREPARING: geekblue[3],
  READY_TO_SERVE: blue[3],
  DONE: green[3],
  CANCELLED: red[3],
};

const OrderList: React.FC<OrderListCardProps> = ({ status, orders }) => {
  return (
    <StyledCard
      status={status}
      title={<div>{orderStatusTranslation[status]}</div>}
      extra={
        <StyledBadge status={status} count={orders?.length} color={badgeColor[status]} showZero />
      }
    >
      {orders.map((order) => {
        return (
          <OrderListCard
            order={order}
            key={order._id}
            color={borderColor[status]??"white"}
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
    width: 252px !important;
  border: 1px solid;
  border-color: ${(props) => borderColor[props.status]};
  .ant-card-body {
    flex: 1;
    overflow-y: auto;
    padding: 0;
  }
  .ant-card-head {
    background-color: ${(props) => headerColor[props.status]};
    border-bottom: 1px solid;
    border-color: ${(props) => borderColor[props.status]};
  }
`;
const StyledBadge = styled(Badge)<{ status: OrderStatus }>`
  .ant-badge-count {
    box-shadow: 0 0 0 1px ${(props) => badgeColor[props.status]};
  }
 `;