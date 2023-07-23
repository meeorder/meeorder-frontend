import { type Order, type OrderStatus } from "@/modules/mock/orders";
import styled from "@emotion/styled";
import { Card, Tag, Typography, type TagProps } from "antd";
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
          <Typography.Title level={5}>{order.food.name}</Typography.Title>
          <Typography.Text type="secondary">
            <span style={{ marginRight: "14px" }}>
              {order.food.price.toFixed(2)} THB
            </span>
            <StyledStatusTag color={colorTag}>{order.status}</StyledStatusTag>
          </Typography.Text>
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
  border-radius: 12px;
  .ant-card-body {
    padding: 0px;
    margin: 0px;
  }
`;

const StyledStatusTag = styled(Tag)`
  border-radius: 12px;
`;

const StyledImage = styled(Image)`
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  margin: 8px;
`;

const FlexBetweenRow = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FlexBetweenCol = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  gap: 8px;
`;

const mapStatusToColor: Record<OrderStatus, TagProps["color"]> = {
  "In queue": "orange",
  Preparing: "geekblue",
  Ready: "blue",
  Success: "green",
  Cancel: "red",
};

export default OrderCard;
