import { type Order } from "@/modules/mock/orders";
import OrderCard from "@/modules/order/components/OrderCard";
import { Space } from "antd";

type OrderListProps = {
  orders: Order[];
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {orders.map((order) => {
        return <OrderCard key={order.id} order={order} />;
      })}
    </Space>
  );
};

export default OrderList;
