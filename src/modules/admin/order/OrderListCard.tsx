import { type GetAllOrdersResponse } from "@/modules/services/orders";
import styled from "@emotion/styled";
import { ArrowLineRight, CheckCircle, Trash } from "@phosphor-icons/react";
import { Divider, theme } from "antd";
import React from "react";
type OrderListCardProps = {
  order: GetAllOrdersResponse[number];
  color: string;
};

const OrderListCard: React.FC<OrderListCardProps> = ({ order, color }) => {
  const { token } = theme.useToken();
  return (
    <CardContainer>
      <TextContainer>{order._id}</TextContainer>
      <Divider type="vertical" />({order.status === "DONE"}?{" "}
      <CheckCircle size={44} color="blue" />
      :({order.status === "CANCELLED"}? <Trash size={44} />:
      <ArrowLineRight size={44} />
      ))
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
