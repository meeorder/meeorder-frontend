import { type Menu } from "@/modules/user/menu/types";
import { randomBytes } from "crypto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MenuWithAdditionalRequest = Menu & {
  additionalRequest: string;
};

export type BasketOrder = {
  menu: MenuWithAdditionalRequest;
  quantity: number;
  basketOrderId: string;
};

type BasketStore = {
  basketOrders: BasketOrder[];
  addOrUpdateToBasket: (
    basketOrderId: string,
    newMenu: MenuWithAdditionalRequest,
    newQuantity: number,
  ) => void;
  deleteBasket: (basketOrderId: string) => void;
};

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      basketOrders: [],
      addOrUpdateToBasket: (basketOrderId, newMenu, newQuantity) => {
        const { basketOrders } = get();
        const basketWithOutUpdated = basketOrders.filter(
          (order) => order.basketOrderId !== basketOrderId,
        );
        const newBasket = mergeMenu(newMenu, newQuantity, basketWithOutUpdated);

        set({ basketOrders: newBasket });
      },
      deleteBasket: (basketOrderId) => {
        const { basketOrders } = get();
        const newBasket = basketOrders.filter(
          (order) => order.basketOrderId !== basketOrderId,
        );
        set({ basketOrders: newBasket });
      },
    }),
    { name: "bearStore" },
  ),
);

function sortMenuAddons(menu: MenuWithAdditionalRequest) {
  return {
    ...menu,
    addons: menu?.addons?.sort((a, b) => a?.price - b?.price),
  };
}

function mergeMenu(
  menu: MenuWithAdditionalRequest,
  quantity: number,
  basketOrders: BasketOrder[],
) {
  const newBasket = structuredClone(basketOrders);
  const newMenu = sortMenuAddons(menu);
  let isExist = false;
  newBasket.forEach((order) => {
    if (JSON.stringify(order.menu) === JSON.stringify(newMenu)) {
      order.quantity += quantity;
      isExist = true;
    }
  });
  if (!isExist) {
    newBasket.push({
      menu: newMenu,
      quantity,
      basketOrderId: `basketOrders-order-${randomBytes(16).toString("hex")}`,
    });
  }

  newBasket.filter((order) => order.quantity > 0);
  return newBasket;
}
