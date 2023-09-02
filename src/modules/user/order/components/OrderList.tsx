import OrderCard from "@/modules/user/order/components/OrderCard";
import { type OrdersWithPriceData } from "@/modules/user/order/hooks/useOrder";
import { Space } from "antd";

type OrderListProps = {
  orders: OrdersWithPriceData["orders"];
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <Space direction="vertical" size={8} style={{ display: "flex" }}>
      {orders.map((order) => {
        return <OrderCard key={order?._id} order={order} />;
      })}
    </Space>
  );
};

export default OrderList;
