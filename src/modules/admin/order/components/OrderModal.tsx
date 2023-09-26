import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { orderStatusTranslation } from "@/pages/admin/order-management";
import { Button, Divider, Modal, theme } from "antd";
import React from "react";

import useUpadateOrderStatusToDone from "@/modules/admin/order/hook/useUpdateOrderStatusToDone";
import useUpadateOrderStatusToPreparing from "@/modules/admin/order/hook/useUpdateOrderStatusToPreparing";
import useUpadateOrderStatusToReadyToServe from "@/modules/admin/order/hook/useUpdateOrderStatusToReadyToServe";
import { H3, H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { ArrowLineLeft, ArrowLineRight, Trash } from "@phosphor-icons/react";

type OrderModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isCancleModalOpen: boolean;
  setIsCancleModalOpen: (value: boolean) => void;
  modalData?: GetAllOrdersResponse[number];
};

const OrderModal: React.FC<OrderModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  isCancleModalOpen,
  setIsCancleModalOpen,
  modalData,
}) => {
  const { token } = theme.useToken();
  const textColor = {
    IN_QUEUE: token["orange-6"],
    PREPARING: token["geekblue-6"],
    READY_TO_SERVE: token["blue-6"],
    DONE: token["green-6"],
    CANCELLED: token["red-6"],
  };
  const { mutate: updateOrderStatusToPreparing } =
    useUpadateOrderStatusToPreparing();
  const { mutate: updateOrderStatusToReadyToServe } =
    useUpadateOrderStatusToReadyToServe();
  const { mutate: updateOrderStatusToDone } = useUpadateOrderStatusToDone();
  const handleUpdateOrderStatusToReadyToServe = (id: string) => {
    updateOrderStatusToReadyToServe({ id: id });
    setIsModalOpen(false);
  };
  const handleUpdateOrderStatusToPreparing = (id: string) => {
    updateOrderStatusToPreparing({ id: id });
    setIsModalOpen(false);
  };
  const handleUpdateOrderStatusToDone = (id: string) => {
    updateOrderStatusToDone({ id: id });
    setIsModalOpen(false);
  };
  const hadleCancelOrder = () => {
    setIsModalOpen(false);
    setIsCancleModalOpen(true);
  };
  return (
    <StyledModal
      title={
        <ModalTitle color={textColor[modalData?.status ?? "IN_QUEUE"]}>
          สถานะ: {orderStatusTranslation[modalData?.status ?? "DONE"]}
        </ModalTitle>
      }
      open={isModalOpen}
      footer={false}
      closeIcon={false}
      centered={true}
      width={"50%"}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <ModalContainer>
        <LeftRightContainer>
          <ModalIconGroup>
            {(modalData?.status === "CANCELLED" ||
              modalData?.status === "PREPARING") && (
              <ModalIcon>
                <StyledArrowLineLeft size={44} color={token["orange-6"]}/>
                <TextIcon color={token["orange-6"]}>อยู่ในคิว</TextIcon>
              </ModalIcon>
            )}
            {(modalData?.status === "CANCELLED" ||
              modalData?.status === "READY_TO_SERVE") && (
              <ModalIcon onClick={() => handleUpdateOrderStatusToPreparing(modalData._id)}>
                <StyledArrowLineLeft size={44} color={token["geekblue-6"]}/>
                <TextIcon color={token["geekblue-6"]}>
                  กำลังเตรียมอาหาร
                </TextIcon>
              </ModalIcon>
            )}
            {(modalData?.status === "CANCELLED" ||
              modalData?.status === "DONE") && (
              <ModalIcon onClick={() => handleUpdateOrderStatusToReadyToServe(modalData._id)}>
                <StyledArrowLineLeft size={44} color={token["blue-6"]}/>
                <TextIcon color={token["blue-6"]}>พร้อมเสิร์ฟ</TextIcon>
              </ModalIcon>
            )}
            {modalData?.status === "CANCELLED" && (
              <ModalIcon onClick={() => handleUpdateOrderStatusToDone(modalData._id)}>
                <StyledArrowLineLeft size={44} color={token["green-6"]}/>
                <TextIcon color={token["green-6"]}>เสร็จสิ้น</TextIcon>
              </ModalIcon>
            )}
          </ModalIconGroup>
          {modalData?.status !== "IN_QUEUE" && (
            <StyledDivider type="vertical" />
          )}
        </LeftRightContainer>
        <OrderContainer>
          <OrderInfo>
            <HeaderOrderContainer>
              <H4>{modalData?.menu.title}</H4>
              <StyledTable color={token.colorPrimary}>
                {modalData?.session?.table?.title || "noTable"}
              </StyledTable>
            </HeaderOrderContainer>
            {modalData?.addons && (
              <ul style={{ margin: "0" }}>
                {modalData?.addons.map((addon) => {
                  return (
                    <li key={addon._id}>
                      <H4>{addon.title}</H4>
                    </li>
                  );
                })}
              </ul>
            )}
            {modalData?.additional_info && (
              <H4>Note: {modalData?.additional_info}</H4>
            )}
          </OrderInfo>
          {modalData?.status !== "CANCELLED" &&
            modalData?.status !== "DONE" && (
              <ButtonContainer>
                <StyledButton type="primary" danger onClick={hadleCancelOrder}>
                  ยกเลิกออเดอร์นี้
                </StyledButton>
                <StyledButton
                  type="primary"
                  onClick={() =>
                    handleUpdateOrderStatusToDone(modalData?._id ?? "")
                  }
                >
                  เสร็จสิ้นออเดอร์นี้
                </StyledButton>
              </ButtonContainer>
            )}
        </OrderContainer>
        <LeftRightContainer>
          {modalData?.status !== "DONE" && <StyledDivider type="vertical" />}
          <ModalIconGroup>
            {modalData?.status === "IN_QUEUE" && (
              <ModalIcon onClick={() => handleUpdateOrderStatusToPreparing(modalData._id)}>
                <StyledArrowLineRight size={44} color={token["geekblue-6"]} />
                <TextIcon color={token["geekblue-6"]}>
                  กำลังเตรียมอาหาร
                </TextIcon>
              </ModalIcon>
            )}
            {modalData?.status === "PREPARING" && (
              <ModalIcon onClick={() => handleUpdateOrderStatusToReadyToServe(modalData._id)}>
                <StyledArrowLineRight size={44} color={token["blue-6"]} />
                <TextIcon color={token["blue-6"]} >พร้อมเสิร์ฟ</TextIcon>
              </ModalIcon>
            )}
            {modalData?.status === "READY_TO_SERVE" && (
              <ModalIcon onClick={() => handleUpdateOrderStatusToDone(modalData._id)}>
                <StyledArrowLineRight size={44} color={token["green-6"]} />
                <TextIcon color={token["green-6"]}>เสร็จสิ้น</TextIcon>
              </ModalIcon>
            )}
            {modalData?.status === "CANCELLED" && (
              <ModalIcon>
                <StyledTrash size={44} color={token["red-6"]} />
                <TextIcon color={token["red-6"]}>ลบออเดอร์นี้</TextIcon>
              </ModalIcon>
            )}
          </ModalIconGroup>
        </LeftRightContainer>
      </ModalContainer>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`;

const ModalTitle = styled.div`
  color: ${(props) => props.color} !important;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.antd.colorBorderSecondary};
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
`;

const OrderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;
const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
const LeftRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ModalIconGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  justify-content: center;
`;

const ModalIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderOrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
`;

const StyledTable = styled(H3)<{ color: string }>`
  color: ${(props) => props.color} !important;
`;

const StyledDivider = styled(Divider)`
  height: 100%;
  margin-right: 24px;
  margin-left: 24px;
`;

const TextIcon = styled.div<{ color: string }>`
  color: ${(props) => props.color} !important;
  width: 100%;
  text-align: center;
`;

const StyledArrowLineLeft = styled(ArrowLineLeft)`
  margin: 8px;
`;

const StyledArrowLineRight = styled(ArrowLineRight)`
  margin: 8px;
`;

const StyledTrash = styled(Trash)`
  margin: 8px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export default OrderModal;
