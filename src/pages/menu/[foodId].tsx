import AddMinusButton from "@/modules/user/food/components/AddMinusButton";
import Content from "@/modules/user/food/components/Content";
import SaveButton from "@/modules/user/food/components/SaveButton";
import useMenu from "@/modules/user/menu/hooks/useMenu";
import styled from "@emotion/styled";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const FoodDetail = () => {
  const router = useRouter();
  const { foodId } = router.query;
  const { data: food } = useMenu({ id: foodId as string });
  const [dishCount, setDishCount] = useState(0);

  const handleBack = () => {
    void router.push("/");
  };

  if (!food) {
    return null;
  }
  return (
    <>
      <LayoutContainer>
        <ImageContainer>
          <Image
            src={food?.image ?? ""}
            alt={food?.title ?? ""}
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
        <Content food={food} />
        <AddToCardButtonNav>
          <AddMinusButton count={dishCount} setCount={setDishCount} />
          <SaveButton count={dishCount} />
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
