import { type Order } from "@/modules/mock/orders";
import { Card } from "antd";

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Card>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </Card>
  );
};

export default OrderCard;
