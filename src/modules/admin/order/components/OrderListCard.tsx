import useUpadateOrderStatusToDone from "@/modules/admin/order/hook/useUpdateOrderStatusToDone";
import useUpadateOrderStatusToPreparing from "@/modules/admin/order/hook/useUpdateOrderStatusToPreparing";
import useUpadateOrderStatusToReadyToServe from "@/modules/admin/order/hook/useUpdateOrderStatusToReadyToServe";
import { H5, Text } from "@/modules/common/components/Typography";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import styled from "@emotion/styled";
import { ArrowLineRight, CheckCircle, Trash } from "@phosphor-icons/react";
import { Divider, theme } from "antd";
import React from "react";
type OrderListCardProps = {
  order: GetAllOrdersResponse[number];
  color: string;
  setIsModalOpen: (value: boolean) => void;
  setModalData: (value: GetAllOrdersResponse[number]) => void;
};

const OrderListCard: React.FC<OrderListCardProps> = ({
  order,
  color,
  setIsModalOpen,
  setModalData,
}) => {
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
  const onClickCard = (order: GetAllOrdersResponse[number]) => {
    setIsModalOpen(true);
    setModalData(order);
  };
  const { token } = theme.useToken();
  return (
    <CardContainer key={order._id} color={color}>
      <ModalSectionDiv onClick={() => onClickCard(order)} />
      <TextContainer>
        {<H5>{order.menu.title}</H5>}
        {
          <StyledTable color={token.colorPrimary ?? "blue"}>
            {order.session?.table?.title || "noTable"}
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
      <IconClickSection
        onClick={() => {
          handelOnclick(order._id, order.status);
        }}
      />
      {(order.status === "PREPARING" ||
        order.status === "IN_QUEUE" ||
        order.status === "READY_TO_SERVE") && (
        <StyledArrowLineRight size={44} color={token.colorPrimary} />
      )}
      {order.status === "CANCELLED" && (
        <StyledTrash size={44} color={token["red-6"]} />
      )}
      {order.status === "DONE" && (
        <StyledCheckCircle size={44} color={token["green-6"]} />
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
  width: 70%;
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
const ModalSectionDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 60px);
  height: 100%;
  z-index: 1;
`;

const IconClickSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  z-index: 1;
`;
export default OrderListCard;
