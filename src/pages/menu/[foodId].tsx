import {
  useBasketStore,
  type BasketOrder,
} from "@/modules/user/basket/hooks/useBasketStore";
import { calculateBasketOrderPrice } from "@/modules/user/basket/utils";
import AddMinusButton from "@/modules/user/food/components/AddMinusButton";
import Content from "@/modules/user/food/components/Content";
import SaveButton from "@/modules/user/food/components/SaveButton";
import useMenu from "@/modules/user/menu/hooks/useMenu";
import styled from "@emotion/styled";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "antd";
import { randomBytes } from "crypto";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FoodDetail = () => {
  const router = useRouter();
  const { foodId } = router.query;
  const { data: menu } = useMenu({ id: foodId as string });
  const [newBasketOrder, setNewBasketOrder] = useState<BasketOrder>();
  const addOrUpdateToBasket = useBasketStore(
    (state) => state.addOrUpdateToBasket,
  );

  useEffect(() => {
    if (!menu) {
      return;
    }
    const newMenu = {
      ...structuredClone(menu),
      additionalRequest: "",
      addons: [],
    };
    setNewBasketOrder({
      menu: newMenu,
      quantity: 1,
      basketOrderId: randomBytes(16).toString("hex"),
    });
  }, [menu]);

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
    void router.push("/");
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
            src={menu?.image ?? ""}
            alt={menu?.title ?? ""}
            width={1000}
            height={1000}
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
        <pre>
          {JSON.stringify(
            {
              ...newBasketOrder,
            },
            null,
            2,
          )}
        </pre>
        <AddToCardButtonNav>
          <AddMinusButton
            count={newBasketOrder?.quantity || 0}
            setCount={setCount}
            isNewOrder={true}
          />
          <SaveButton
            count={newBasketOrder?.quantity || 0}
            isNewOrder={true}
            price={calculateBasketOrderPrice(newBasketOrder)}
            onClick={() => handleAddOrUpdateToBasket()}
          />
        </AddToCardButtonNav>
      </LayoutContainer>
    </>
  );
};

export default FoodDetail;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
