import TextPrice from "@/modules/common/components/TextPrice";
import { H5, Text } from "@/modules/common/components/Typography";
import { type BasketOrder } from "@/modules/user/basket/hooks/useBasketStore";
import { calculateBasketOrderPrice } from "@/modules/user/basket/utils";
import styled from "@emotion/styled";
import { Button, Typography, theme } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

type BasketFoodCardProps = {
  basketOrder: BasketOrder;
};

const BasketFoodCard: React.FC<BasketFoodCardProps> = ({ basketOrder }) => {
  const { token } = theme.useToken();
  const router = useRouter();
  const handleEditOrder = () => {
    const params = new URLSearchParams();
    params.append("basket-order-id", basketOrder?.basketOrderId ?? "");
    void router.push({
      pathname: `/menu/${basketOrder?.menu?._id}`,
      query: params.toString(),
    });
  };

  return (
    <BasketCardContainer>
      <FoodDetails>
        <ContentGroup>
          <H5>{basketOrder?.menu?.title}</H5>
          <TextPrice
            price={calculateBasketOrderPrice(basketOrder)}
            color={token.colorText}
          />
        </ContentGroup>
        <ContentGroup>
          {basketOrder?.menu?.addons?.map((addon) => (
            <Text key={addon?._id} type="secondary">
              {addon?.title}
            </Text>
          ))}
          {basketOrder?.menu?.additionalRequest && (
            <Text>โน๊ต : {basketOrder?.menu?.additionalRequest}</Text>
          )}
        </ContentGroup>
        <Typography.Link onClick={handleEditOrder}>Edit</Typography.Link>
      </FoodDetails>
      <ImageContainer>
        <Image
          src={basketOrder?.menu?.image}
          alt={basketOrder?.menu?.title}
          width={900}
          height={900}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
            width: "100px",
            height: "100px",
          }}
        />
        <QuantityButton
          shape="circle"
          type="primary"
          ghost
          onClick={handleEditOrder}
        >
          {basketOrder?.quantity}
        </QuantityButton>
      </ImageContainer>
    </BasketCardContainer>
  );
};

export default BasketFoodCard;

const BasketCardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const FoodDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const QuantityButton = styled(Button)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: ${(props) => props.theme.antd.colorBgBase} !important;
`;
