import TextPrice from "@/modules/common/components/TextPrice";
import { H5, Text } from "@/modules/common/components/Typography";
import { type BasketOrder } from "@/modules/user/mock/orders";
import styled from "@emotion/styled";
import { Button, theme } from "antd";
import Image from "next/image";
import Link from "next/link";

type BasketFoodCardProps = {
  order: BasketOrder;
};

const BasketFoodCard: React.FC<BasketFoodCardProps> = ({ order }) => {
  const { token } = theme.useToken();
  return (
    <BasketCardContainer>
      <FoodDetails>
        <ContentGroup>
          <H5>{order.food.name}</H5>
          {/* TODO calculate price from food and addons */}
          <TextPrice price={order.food.price} color={token.colorText} />
        </ContentGroup>
        <ContentGroup>
          {order.addons?.map((addon) => (
            <Text key={addon.id} type="secondary">
              {addon.name}
            </Text>
          ))}
        </ContentGroup>
        {/* TODO navigate to edit link */}
        <Link href={"#"} style={{ color: token.colorPrimary }}>
          Edit
        </Link>
      </FoodDetails>
      <ImageContainer>
        <Image
          src={order.food.imagePath ?? ""}
          alt={order.food.name}
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
          {order.quantity}
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
