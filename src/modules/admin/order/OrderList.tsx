import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { type OrderStatus } from "@/pages/admin/order-management";
import styled from "@emotion/styled";
import { Card } from "antd";

type OrderListCardProps = {
  status: OrderStatus;
  orders: GetAllOrdersResponse;
};

const OrderList: React.FC<OrderListCardProps> = ({ status, orders }) => {
  return (
    <StyledCard title={<div>{status}</div>} extra={<div>extra</div>}>
      {orders.map((order) => {
        return <div key={order._id}>{status}</div>;
      })}
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
      <div>asdasd</div>
    </StyledCard>
  );
};

export default OrderList;

const StyledCard = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 144px);

  .ant-card-body {
    flex: 1;
    overflow-y: auto;
    padding: 0;
  }
`;
