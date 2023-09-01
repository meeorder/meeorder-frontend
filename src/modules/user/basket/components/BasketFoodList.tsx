import { H4 } from "@/modules/common/components/Typography";
import BasketFoodCard from "@/modules/user/basket/components/BasketFoodCard";
import { type BasketOrder } from "@/modules/user/basket/hooks/useBasketStore";
import { List } from "antd";

type BasketFoodListProp = {
  basketOrders: BasketOrder[];
};

const BasketFoodList: React.FC<BasketFoodListProp> = ({ basketOrders }) => {
  return (
    <List
      size="large"
      header={<H4>My Basket</H4>}
      dataSource={basketOrders}
      renderItem={(order) => (
        <List.Item>
          <BasketFoodCard basketOrder={order} />
        </List.Item>
      )}
      style={{ marginInline: "20px" }}
    />
  );
};

export default BasketFoodList;
