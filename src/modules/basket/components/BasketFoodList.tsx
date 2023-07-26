import BasketFoodCard from "@/modules/basket/components/BasketFoodCard";
import { H4 } from "@/modules/common/components/Typography";
import { type BasketOrder } from "@/modules/mock/orders";
import { List } from "antd";

type BasketFoodListProp = {
  orders: BasketOrder[];
};

const BasketFoodList: React.FC<BasketFoodListProp> = ({ orders }) => {
  return (
    <List
      size="large"
      header={<H4>My Basket</H4>}
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
