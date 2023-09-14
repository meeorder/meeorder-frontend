import { H5, Text } from "@/modules/common/components/Typography";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { blue, green, red } from "@ant-design/colors";
import styled from "@emotion/styled";
import { ArrowLineRight, CheckCircle, Trash } from "@phosphor-icons/react";
import { Divider } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React from "react";
type OrderListCardProps = {
  order: GetAllOrdersResponse[number];
  color: string;
};

const OrderListCard: React.FC<OrderListCardProps> = ({ order, color }) => {
  return (
    <CardContainer color={color}>
      <TextContainer>
        {<H5>{order.menu.title}</H5>}
        {<StyledTable color={blue[6]}>kuy</StyledTable>}
        <Paragraph style={{ margin: 0 }}>
          <ul>
            {order.addons.map((addon) => {
              return <li key={addon._id}>{addon.title}</li>;
            })}
          </ul>
        </Paragraph>
        {order.additional_info && (
          <StyledAddInfo ellipsis={{ rows: 2 }}>
            Note: {order.additional_info}
          </StyledAddInfo>
        )}
      </TextContainer>
      <StyledDivider type="vertical" />
      {(order.status === "PREPARING" ||
        order.status === "IN_QUEUE" ||
        order.status === "READY_TO_SERVE") && (
        <StyledArrowLineRight size={44} color={blue.primary} />
      )}
      {order.status === "CANCELLED" && <StyledTrash size={44} color={red[6]} />}
      {order.status === "DONE" && (
        <StyledCheckCircle size={44} color={green[6]} />
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid ${(props) => props.color};
  padding: 24px;
  width: 252px;
  padding-right: 8px;
`;
const TextContainer = styled.div`
  height: 100%;
  width: 160;
`;
const StyledTrash = styled(Trash)`
  position: absolute;
  right: 8px;
  top: calc(50% - 22px);
`;
const StyledCheckCircle = styled(CheckCircle)`
  position: absolute;
  right: 8px;
  top: calc(50% - 22px);
`;
const StyledArrowLineRight = styled(ArrowLineRight)`
  position: absolute;
  right: 8px;
  top: calc(50% - 22px);
`;
const StyledDivider = styled(Divider)`
  top: 8px;
  right: 52px;
  height: calc(100% - 16px);
  position: absolute;
`;
const StyledAddInfo = styled(Text)`
  width: 160px;
  overflow: hidden;
`;

const StyledTable = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: bold;
  position: absolute;
  top: 24px;
  right: 68px;
`;
export default OrderListCard;
