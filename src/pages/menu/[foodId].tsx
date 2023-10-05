import { checkImageSrc } from "@/modules/common/utils";
import {
  useBasketStore,
  type BasketOrder,
} from "@/modules/user/basket/hooks/useBasketStore";
import { calculateBasketOrderPrice } from "@/modules/user/basket/utils";
import AddMinusButton from "@/modules/user/food/components/AddMinusButton";
import Content from "@/modules/user/food/components/Content";
import SaveButton from "@/modules/user/food/components/SaveButton";
import useMenu from "@/modules/user/menu/hooks/useMenu";
import { useSession } from "@/modules/user/order/hooks/useSession";
import styled from "@emotion/styled";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "antd";
import { randomBytes } from "crypto";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FoodDetail = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { foodId } = router.query;
  const { data: menu } = useMenu({ id: foodId as string });
  const [isNewOrder, setIsNewOrder] = useState(false);
  const [newBasketOrder, setNewBasketOrder] = useState<BasketOrder>();
  const [addOrUpdateToBasket, basketOrders] = useBasketStore((state) => [
    state.addOrUpdateToBasket,
    state.basketOrders,
  ]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const basketOrderId = router.query["basket-order-id"];
    let basketOrder: BasketOrder | undefined;

    if (basketOrderId) {
      basketOrder = basketOrders.find(
        (order) => order.basketOrderId === basketOrderId.toString(),
      );
    } else {
      setIsNewOrder(true);
    }
    if (!menu) {
      return;
    }
    const newMenu = {
      ...structuredClone(menu),
      additionalRequest: "",
      addons: [],
    };
    setNewBasketOrder({
      menu: basketOrder?.menu ?? newMenu,
      quantity: basketOrder?.quantity ?? 1,
      basketOrderId:
        basketOrder?.basketOrderId ?? randomBytes(16).toString("hex"),
    });
  }, [menu, router, basketOrders]);

  const setCount = (value: number) => {
    setNewBasketOrder((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        quantity: value,
      };
    });
  };

  const handleBack = () => {
    void router.back();
  };

  const handleAddOrUpdateToBasket = () => {
    if (!newBasketOrder) {
      return;
    }

    addOrUpdateToBasket(
      newBasketOrder.basketOrderId,
      newBasketOrder.menu,
      newBasketOrder.quantity,
    );
    void router.push("/basket");
  };

  if (!menu) {
    return null;
  }
  return (
    <>
      <LayoutContainer>
        <ImageContainer>
          <Image
            src={checkImageSrc(menu?.image ?? "")}
            alt={menu?.title ?? ""}
            width={500}
            height={500}
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "264px",
            }}
          />
          <BackButton
            shape="circle"
            size="large"
            icon={<ArrowLeft size={16} />}
            onClick={handleBack}
          />
        </ImageContainer>
        <Content
          menu={menu}
          newBasketOrder={newBasketOrder}
          setNewBasketOrder={setNewBasketOrder}
        />
        {session && (
          <AddToCardButtonNav>
            <AddMinusButton
              count={newBasketOrder?.quantity ?? 1}
              setCount={setCount}
              isNewOrder={isNewOrder}
            />
            <SaveButton
              count={newBasketOrder?.quantity ?? 1}
              isNewOrder={isNewOrder}
              price={calculateBasketOrderPrice(newBasketOrder)}
              onClick={() => handleAddOrUpdateToBasket()}
            />
          </AddToCardButtonNav>
        )}
      </LayoutContainer>
    </>
  );
};

export default FoodDetail;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.antd.colorBgLayout};
`;

const AddToCardButtonNav = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 88px;
  max-width: 500px;
  background-color: ${(props) => props.theme.antd.colorBgBase};
  display: flex;
  justify-content: space-between;
  padding: 20px 32px;
  align-items: center;
  z-index: 100;
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 264px;
`;
