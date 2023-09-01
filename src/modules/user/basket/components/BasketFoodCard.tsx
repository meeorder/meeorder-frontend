import TextPrice from "@/modules/common/components/TextPrice";
import { H5, Text } from "@/modules/common/components/Typography";
import { type BasketOrder } from "@/modules/user/basket/hooks/useBasketStore";
import { calculateBasketOrderPrice } from "@/modules/user/basket/utils";
import styled from "@emotion/styled";
import { Button, theme } from "antd";
import Image from "next/image";
import Link from "next/link";

type BasketFoodCardProps = {
  basketOrder: BasketOrder;
};

const BasketFoodCard: React.FC<BasketFoodCardProps> = ({ basketOrder }) => {
  const { token } = theme.useToken();
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
          <Text type="secondary">{basketOrder?.menu?.additionalRequest}</Text>
        </ContentGroup>
        {/* TODO navigate to edit link */}
        <Link href={"#"} style={{ color: token.colorPrimary }}>
          Edit
        </Link>
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
        <QuantityButton shape="circle" type="primary" ghost>
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
