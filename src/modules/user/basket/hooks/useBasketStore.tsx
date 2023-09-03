import {
  createOrder,
  type CreateOrderBodyParam,
} from "@/modules/services/orders";
import { type Menu } from "@/modules/user/menu/types";
import { useSessionStore } from "@/modules/user/order/hooks/useSessionStore";
import { useMutation } from "@tanstack/react-query";
import { randomBytes } from "crypto";
import { useRouter } from "next/router";
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
  deleteBasketOrder: (basketOrderId: string) => void;
  deleteAllBasketOrder: () => void;
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
      deleteBasketOrder: (basketOrderId) => {
        const { basketOrders } = get();
        const newBasket = basketOrders.filter(
          (order) => order.basketOrderId !== basketOrderId,
        );
        set({ basketOrders: newBasket });
      },
      deleteAllBasketOrder: () => {
        set({ basketOrders: [] });
      },
    }),
    { name: "basket", skipHydration: true },
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
  let newBasket = structuredClone(basketOrders);
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

  newBasket = newBasket.filter((order) => order.quantity > 0);
  newBasket = newBasket.sort((a, b) =>
    a.menu.title.localeCompare(b.menu.title),
  );
  return newBasket;
}

export const useConfirmOrder = () => {
  const { basketOrders, deleteAllBasketOrder } = useBasketStore((state) => ({
    basketOrders: state.basketOrders,
    deleteAllBasketOrder: state.deleteAllBasketOrder,
  }));
  const session = useSessionStore((state) => state.session);

  const allBasketOrders: CreateOrderBodyParam = {
    session: session?._id ?? "",
    orders: [],
  };

  const router = useRouter();

  const handleSuccess = () => {
    deleteAllBasketOrder();
    void router.push({
      pathname: "/orders",
    });
  };

  basketOrders.forEach((order) => {
    const { menu, quantity } = order;
    for (let i = 0; i < quantity; i++) {
      allBasketOrders.orders.push({
        menu: menu._id,
        addons: menu?.addons?.map((addon) => addon._id) ?? [],
        additional_info: menu?.additionalRequest ?? "",
      });
    }
  });

  return useMutation({
    mutationFn: () => createOrder(allBasketOrders),
    onSuccess: handleSuccess,
  });
};
