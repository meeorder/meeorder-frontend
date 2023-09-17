import WireFrame from "@/modules/mock/components/WireFrame";
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
      <WireFrame
        height={"200px"}
        contentNode={status + " order"}
        cardColor="lightcoral"
      />
      <WireFrame
        height={"200px"}
        contentNode={status + " order"}
        cardColor="lightseagreen"
      />
      <WireFrame
        height={"200px"}
        contentNode={status + " order"}
        cardColor="lightsteelblue"
      />
      <WireFrame
        height={"200px"}
        contentNode={status + " order"}
        cardColor="lightpink"
      />
      <WireFrame
        height={"200px"}
        contentNode={status + " order"}
        cardColor="lightcoral"
      />
      <WireFrame
        height={"200px"}
        contentNode={status + " order"}
        cardColor="lightseagreen"
      />
      <WireFrame
        height={"200px"}
        contentNode={status + " order"}
        cardColor="lightsteelblue"
      />
      <WireFrame
        height={"200px"}
        contentNode={status + " order"}
        cardColor="lightpink"
      />
    </StyledCard>
  );
};

export default OrderList;

const StyledCard = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 144px);

  .ant-card-body {
    flex: 1;
    overflow-y: auto;
    padding: 0;
  }
`;
