import { type Order } from "@/modules/mock/orders";
import styled from "@emotion/styled";
import { Card, Tag, Typography } from "antd";
import Image from "next/image";

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const colorTag = mapStatusToColor[order.status];
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
        <StyledImage
          width={900}
          height={900}
          src={order.food.imagePath ?? ""}
          alt={order.food.name}
        />
      </FlexBetweenRow>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  .ant-card-body {
    height: 96px;
    padding: 8px;
  }
`;

const StyledStatusTag = styled(Tag)`
  margin-left: 14px;
  border-radius: 12px;
`;

const StyledImage = styled(Image)`
  height: 100%;
  width: 120px;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
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
  color: ${(props) => props.theme.antd.colorText};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const StyledTextFoodPrice = styled(Typography.Text)`
  color: ${(props) => props.theme.antd.colorTextSecondary};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const mapStatusToColor = {
  "in queue": "cyan",
  preparing: "blue",
  "ready to serve": "geekblue",
  success: "green",
  cancel: "red",
};

export default OrderCard;
