import useUpadateOrderStatusToDone from "@/modules/admin/order/hook/useUpdateOrderStatusToDone";
import useUpadateOrderStatusToPreparing from "@/modules/admin/order/hook/useUpdateOrderStatusToPreparing";
import useUpadateOrderStatusToReadyToServe from "@/modules/admin/order/hook/useUpdateOrderStatusToReadyToServe";
import { H5, Text } from "@/modules/common/components/Typography";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { blue, green, red } from "@ant-design/colors";
import styled from "@emotion/styled";
import { ArrowLineRight, CheckCircle, Trash } from "@phosphor-icons/react";
import { Divider } from "antd";
import React from "react";
type OrderListCardProps = {
  order: GetAllOrdersResponse[number];
  color: string;
};

const OrderListCard: React.FC<OrderListCardProps> = ({ order, color }) => {
  const { mutate: updateOrderStatusToPreparing } =
    useUpadateOrderStatusToPreparing();
  const { mutate: updateOrderStatusToReadyToServe } =
    useUpadateOrderStatusToReadyToServe();
  const { mutate: updateOrderStatusToDone } = useUpadateOrderStatusToDone();
  const handelOnclick = (id: string, status: string) => {
    if (status === "PREPARING") updateOrderStatusToReadyToServe({ id: id });
    if (status === "IN_QUEUE") updateOrderStatusToPreparing({ id: id });
    if (status === "READY_TO_SERVE") updateOrderStatusToDone({ id: id });
  };
  return (
    <CardContainer key={order._id} color={color}>
      <TextContainer>
        {<H5>{order.menu.title}</H5>}
        {
          <StyledTable color={blue.primary ?? "blue"}>
            {order.session?.table?.title || "no session"}
          </StyledTable>
        }
        <ul style={{ margin: "0" }}>
          {order.addons.map((addon) => {
            return <li key={addon._id}>{addon.title}</li>;
          })}
        </ul>
        {order.additional_info && (
          <StyledAddInfo ellipsis={true}>
            Note: {order.additional_info}
          </StyledAddInfo>
        )}
      </TextContainer>
      <StyledDivider type="vertical" />
      {(order.status === "PREPARING" ||
        order.status === "IN_QUEUE" ||
        order.status === "READY_TO_SERVE") && (
        <StyledArrowLineRight
          size={44}
          color={blue.primary}
          onClick={() => {
            handelOnclick(order._id, order.status);
          }}
        />
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
  border-bottom: 1px solid ${(props) => props.color};
  padding: 24px;
  width: 100%;
  padding-right: 8px;
  margin: 0;
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
