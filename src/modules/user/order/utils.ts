import { type OrdersWithPriceData } from "@/modules/user/order/hooks/useOrder";

export const calculateOrderPrice = (
  order: OrdersWithPriceData["orders"][number],
) => {
  return (
    order?.menu?.price +
    order?.addons?.reduce((acc, addon) => acc + addon?.price, 0)
  );
};
