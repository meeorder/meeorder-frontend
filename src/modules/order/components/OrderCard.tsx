import { OrderStatus, type Order } from "@/modules/mock/orders";
import styled from "@emotion/styled";
import { Card, Image, Tag, Typography } from "antd";

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const colorTag = GetColorByStatus(order.status);
  return (
    <StyledCard>
      <FlexBetweenRow>
        <FlexBetweenCol>
          <StyledTextFoodName>{order.food.name}</StyledTextFoodName>
          <StyledTextFoodPrice>
            {order.food.price.toFixed(2)} THB
            <StyledStatusTag color={colorTag}>{order.status}</StyledStatusTag>
          </StyledTextFoodPrice>
        </FlexBetweenCol>
        <ImageContainer>
          <StyledImage
            width={114.545}
            height={70}
            src={order.food.image}
            alt={order.food.name}
          />
        </ImageContainer>
      </FlexBetweenRow>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  .ant-card-body {
    padding: 0px;
    height: 86px;
  }
`;

const StyledStatusTag = styled(Tag)`
  margin-left: 14px;
  border-radius: 12px;
`;

const ImageContainer = styled.div`
  right: 7.45px;
  position: absolute;
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
`;

const FlexBetweenRow = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexBetweenCol = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

const StyledTextFoodName = styled(Typography.Text)`
  color: var(--character-title-85, rgba(0, 0, 0, 0.85));
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const StyledTextFoodPrice = styled(Typography.Text)`
  color: var(--character-secondary-45, rgba(0, 0, 0, 0.45));
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

function GetColorByStatus(status: OrderStatus) {
  switch (status) {
    case "in queue":
      return "cyan";
    case "preparing":
      return "blue";
    case "ready to serve":
      return "geekblue";
    case "success":
      return "green";
    case "cancel":
      return "red";
  }
}

export default OrderCard;
