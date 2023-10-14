import useDeleteOrder from "@/modules/admin/order/hook/useDeleteOrder";
import useUpdateOrderStatusToDone from "@/modules/admin/order/hook/useUpdateOrderStatusToDone";
import useUpdateOrderStatusToPreparing from "@/modules/admin/order/hook/useUpdateOrderStatusToPreparing";
import useUpdateOrderStatusToReadyToServe from "@/modules/admin/order/hook/useUpdateOrderStatusToReadyToServe";
import { H5, Text } from "@/modules/common/components/Typography";
import { transientOptions } from "@/modules/common/transientOptions";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import styled from "@emotion/styled";
import { ArrowLineRight, CheckCircle, Trash } from "@phosphor-icons/react";
import { Button, ConfigProvider, Divider, Tag, theme } from "antd";
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
  const { token } = theme.useToken();
  const { mutate: updateOrderStatusToPreparing, isIdle: isToPreparingIdle } =
    useUpdateOrderStatusToPreparing();
  const {
    mutate: updateOrderStatusToReadyToServe,
    isIdle: isToReadyToServeIdle,
  } = useUpdateOrderStatusToReadyToServe();
  const { mutate: updateOrderStatusToDone, isIdle: isToDoneIdle } =
    useUpdateOrderStatusToDone();
  const { mutate: deleteOrder, isIdle: isDeleteIdle } = useDeleteOrder();
  const handelOnclick = (id: string, status: string) => {
    if (status === "PREPARING") updateOrderStatusToReadyToServe({ id: id });
    if (status === "IN_QUEUE") updateOrderStatusToPreparing({ id: id });
    if (status === "READY_TO_SERVE") updateOrderStatusToDone({ id: id });
    if (status === "CANCELLED") deleteOrder({ id: id });
  };
  const isLoading = !(
    isToPreparingIdle &&
    isToReadyToServeIdle &&
    isToDoneIdle &&
    isDeleteIdle
  );

  const onClickCard = (order: GetAllOrdersResponse[number]) => {
    setIsModalOpen(true);
    setModalData(order);
  };
  return (
    <CardContainer key={order._id} $color={color}>
      <ModalSectionDiv onClick={() => onClickCard(order)} />
      <TextContainer>
        {<H5>{order.menu.title}</H5>}
        {
          <StyledTable $color={token.colorPrimary ?? "blue"}>
            {order?.session?.table?.title || "noTable"}
          </StyledTable>
        }
        <ul style={{ margin: "0" }}>
          {order.addons.map((addon, index) => {
            return <li key={addon._id + index.toString()}>{addon.title}</li>;
          })}
        </ul>
        {order.additional_info && (
          <StyledAddInfo>
            Note: {order.additional_info}
          </StyledAddInfo>
        )}
        {order.status === "CANCELLED" &&
          order.cancel?.ingredients.length != 0 && (
            <ConfigProvider
              theme={{
                token: {
                  colorSplit: token["red-3"],
                },
              }}
            >
              <OutOfStockContainer>
                <IngredientReasonDivider>วัตถุดิบหลัก</IngredientReasonDivider>
                <TagGroup>
                  {order.cancel?.ingredients.map((ingredient) => {
                    return (
                      <IngredientTag key={ingredient._id}>
                        {ingredient.title}
                      </IngredientTag>
                    );
                  })}
                </TagGroup>
              </OutOfStockContainer>
            </ConfigProvider>
          )}
        {order.status === "CANCELLED" && order.cancel?.addons.length != 0 && (
          <ConfigProvider
            theme={{
              token: {
                colorSplit: token["orange-3"],
              },
            }}
          >
            <OutOfStockContainer>
              <AddOnsReasonDivider>ท็อปปิ้ง</AddOnsReasonDivider>
              <TagGroup>
                {order.cancel?.addons.map((addon) => {
                  return <AddOnsTag key={addon._id}>{addon.title}</AddOnsTag>;
                })}
              </TagGroup>
            </OutOfStockContainer>
          </ConfigProvider>
        )}
        {order.status === "CANCELLED" && order.cancel?.reasons.length != 0 && (
          <ConfigProvider
            theme={{
              token: {
                colorSplit: token["red-3"],
              },
            }}
          >
            <OutOfStockContainer>
              <IngredientReasonDivider>หมายเหตุ</IngredientReasonDivider>
              <TagGroup>
                {order.cancel?.reasons.map((reason) => {
                  return <IngredientTag key={reason}>{reason}</IngredientTag>;
                })}
              </TagGroup>
            </OutOfStockContainer>
          </ConfigProvider>
        )}
      </TextContainer>
      <StyledDivider type="vertical" />
      <IconClickSection
        onClick={() => {
          handelOnclick(order._id, order.status);
        }}
        $color={color}
        loading={isLoading}
      >
        {!isLoading && (
          <>
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
          </>
        )}
      </IconClickSection>
    </CardContainer>
  );
};

const CardContainer = styled("div", transientOptions)<{ $color: string }>`
  display: flex;
  align-items: center;
  position: relative;
  border-top: 1px solid ${(props) => props.$color};
  border-bottom: 1px solid ${(props) => props.$color};
  padding: 24px;
  width: 100%;
  padding-right: 8px;
  margin: 0;
`;
const TextContainer = styled.div`
  height: 100%;
  width: calc(100% - 60px);
`;
const OutOfStockContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;
const AddOnsTag = styled(Tag)`
  margin: 0;
  border: 0;
  padding: 1px 8px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.antd["orange-1"]};
  color: ${(props) => props.theme.antd["orange-6"]};
  width: fit-content;
`;
const IngredientTag = styled(Tag)`
  margin: 0;
  border: 0;
  padding: 1px 8px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.antd["red-1"]};
  color: ${(props) => props.theme.antd["red-6"]};
  width: fit-content;
`;

const IngredientReasonDivider = styled(Divider)`
  margin: 0;
  padding: 0;
  border: none;
  height: 0;
  margin-bottom: 8px;
  color: ${(props) => props.theme.antd["red-6"]} !important;
`;
const AddOnsReasonDivider = styled(Divider)`
  margin: 0;
  padding: 0;
  border: none;
  height: 0;
  margin-bottom: 8px;
  color: ${(props) => props.theme.antd["orange-6"]} !important;
`;

const TagGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
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
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledTable = styled(Text, transientOptions)<{ $color: string }>`
  color: ${(props) => props.$color};
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

const IconClickSection = styled(Button, transientOptions)<{ $color: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px !important;
  height: 100%;
  border-radius: 0;
  border-bottom: 0;
  border-top: 0;
  border-color: ${(props) => props.$color} !important;
  z-index: 1;
`;
export default OrderListCard;
