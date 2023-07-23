import BasketFoodCard from "@/modules/basket/components/BasketFoodCard";
import { type BasketOrder } from "@/modules/mock/orders";
import { List, Typography } from "antd";

type BasketFoodListProp = {
  orders: BasketOrder[];
};

const BasketFoodList: React.FC<BasketFoodListProp> = ({ orders }) => {
  return (
    <List
      size="large"
      header={<Typography.Title level={4}>My Basket</Typography.Title>}
      dataSource={orders}
      renderItem={(order) => (
        <List.Item>
          <BasketFoodCard order={order} />
        </List.Item>
      )}
      style={{ marginInline: "20px" }}
    />
  );
};

export default BasketFoodList;
