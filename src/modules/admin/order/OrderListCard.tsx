import { type GetAllOrdersResponse } from "@/modules/services/orders";
import styled from "@emotion/styled";
import { ArrowLineRight } from "@phosphor-icons/react";
import { Divider } from "antd";
import React from "react";
type OrderListCardProps = {
  order: GetAllOrdersResponse[number];
  color: string;
};

const OrderListCard: React.FC<OrderListCardProps> = ({ order,color }) => {
  return (
    <CardContainer>
      <TextContainer>{order._id}</TextContainer>
      <Divider type="vertical" />
      <ArrowLineRight size={60} />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  border: 1px solid ${(props) => props.theme.antd.colorBorderSecondary};
`;
const TextContainer = styled.div`
  height: 100%;
`;
export default OrderListCard;
