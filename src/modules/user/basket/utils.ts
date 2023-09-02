import { type BasketOrder } from "@/modules/user/basket/hooks/useBasketStore";

export const calculateBasketOrderPrice = (
  basketOrder?: Omit<BasketOrder, "basketOrderId">,
) => {
  if (!basketOrder) return 0;
  const pricePerItem =
    basketOrder?.menu?.price +
    basketOrder?.menu?.addons?.reduce((acc, addon) => acc + addon?.price, 0);

  return pricePerItem * basketOrder?.quantity;
};

export const calculateBasketOrdersPrice = (basketOrders: BasketOrder[]) => {
  return basketOrders?.reduce(
    (acc, basketOrder) => acc + calculateBasketOrderPrice(basketOrder),
    0,
  );
};
