import TextPrice from "@/modules/common/components/TextPrice";
import { H5, Text } from "@/modules/common/components/Typography";
import { type OrdersWithPriceData } from "@/modules/user/order/hooks/useOrder";
import { calculateOrderPrice } from "@/modules/user/order/utils";
import styled from "@emotion/styled";
import { Card, Tag, type TagProps } from "antd";
import Image from "next/image";

type Order = OrdersWithPriceData["orders"][number];

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const colorTag =
    mapStatusToColor[order?.cancelled_at ? "CANCEL" : order?.status];
  return (
    <StyledCard>
      <FlexBetweenRow>
        <FlexBetweenCol>
          <H5>{order?.menu?.title}</H5>
          <Text type="secondary">
            <TextPrice price={calculateOrderPrice(order)} />
            <StyledStatusTag color={colorTag}>{order.status}</StyledStatusTag>
          </Text>
          {order?.addons?.map((addon) => {
            return (
              <Text type="secondary" key={addon?._id}>
                {addon?.title}
              </Text>
            );
          })}
          {order?.additional_info && (
            <Text type="secondary">เพิ่มเติม: {order?.additional_info}</Text>
          )}
        </FlexBetweenCol>
        <StyledImage
          width={900}
          height={900}
          src={order?.menu?.image}
          alt={order?.menu?.title}
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
  margin-left: 12px;
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

const mapStatusToColor: Record<Order["status"] | "CANCEL", TagProps["color"]> =
  {
    IN_QUEUE: "orange",
    PREPARING: "geekblue",
    READY_TO_SERVE: "blue",
    DONE: "green",
    CANCEL: "red",
  };

export default OrderCard;
