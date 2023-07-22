import { type BasketOrder } from "@/modules/mock/orders";
import styled from "@emotion/styled";
import { Typography, theme } from "antd";
import Image from "next/image";
import Link from "next/link";

type BasketFoodCardProps = {
  order: BasketOrder;
};

const BasketFoodCard: React.FC<BasketFoodCardProps> = ({ order }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <BasketCardContainer>
      <FoodDetails>
        <ContentGroup>
          <Typography.Title style={{ margin: "0px" }} level={5}>
            {order.food.name}
          </Typography.Title>
          <Typography.Text type="secondary">
            {order.food.price} Baht
          </Typography.Text>
        </ContentGroup>
        <ContentGroup>
          {order.addons?.map((addon) => (
            <Typography.Text key={addon.id} type="secondary">
              {addon.name}
            </Typography.Text>
          ))}
        </ContentGroup>
        {/* TODO navigate to edit link */}
        <Link style={{ color: colorPrimary }} href={""} target="_blank">
          Edit
        </Link>
      </FoodDetails>
      <Image
        src={order.food.imagePath ?? ""}
        alt={order.food.name}
        width={100}
        height={100}
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
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
