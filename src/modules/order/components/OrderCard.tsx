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
        <ImageContainer>
          <StyledImage
            width={250}
            height={100}
            src={order.food.image ?? ""}
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
  width: 114.545px;
  height: 70px;
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
