import { H5, Text } from "@/modules/common/components/Typography";
import { type GetAllOrdersResponse } from "@/modules/services/orders";
import { orderStatusTranslation } from "@/pages/admin/order-management";
import { SettingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Divider, Menu, Modal, theme, type MenuProps } from "antd";
import React, { useState } from "react";

type CancelOrderModalProps = {
  setIsModalOpen: (value: boolean) => void;
  isCancleModalOpen: boolean;
  setIsCancleModalOpen: (value: boolean) => void;
  modalData?: GetAllOrdersResponse[number];
};

const items: MenuProps["items"] = [
  {
    label: "วัตถุดิบหมด",
    key: "outOfStock",
    icon: <SettingOutlined />,
  },
  {
    label: "สาเหตุอื่นๆ",
    key: "other",
    icon: <SettingOutlined />,
  },
];

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
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
  const [cancelReasonMode, setCancelReasonMode] =
    useState<string>("outOfStock");
  const handleBackToOrderModal = () => {
    setIsCancleModalOpen(false);
    setIsModalOpen(true);
  };
  const handelChangeCancelReasonMode: MenuProps["onClick"] = (e) => {
    console.log(e);
    setCancelReasonMode(e?.key);
  };
  return (
    <StyledModal
      title={
        <ModalTitle color={textColor[modalData?.status ?? "IN_QUEUE"]}>
          สถานะ: {orderStatusTranslation[modalData?.status ?? "DONE"]}
        </ModalTitle>
      }
      open={isCancleModalOpen}
      footer={false}
      closeIcon={false}
      centered={true}
      width={"50%"}
      onCancel={() => {
        setIsCancleModalOpen(false);
      }}
    >
      <ModalContainer>
        <LeftContainer>
          <OrderInfo>
            <H5>{modalData?.menu.title}</H5>
            {modalData?.addons && (
              <ul style={{ margin: "0" }}>
                {modalData?.addons.map((addon) => {
                  return <li key={addon._id}>{addon.title}</li>;
                })}
              </ul>
            )}
            {modalData?.additional_info && (
              <AddInfo ellipsis={true}>
                Note: {modalData?.additional_info}
              </AddInfo>
            )}
          </OrderInfo>
          <StyledDivider type="vertical" />
        </LeftContainer>
        <CancleReasonContainer>
          <StyledMenu
            style={{ minWidth: 0, flex: "auto" }}
            onClick={handelChangeCancelReasonMode}
            selectedKeys={[cancelReasonMode]}
            mode="horizontal"
            items={items}
          />
          <H5>เหตุผลที่ยกเลิก{cancelReasonMode}</H5>
          <ButtonContainer>
            <StyledButton onClick={handleBackToOrderModal}>
              ย้อนกลับ
            </StyledButton>
            <StyledButton type="primary" danger>
              ยกเลิกออเดอร์นี้
            </StyledButton>
          </ButtonContainer>
        </CancleReasonContainer>
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

const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
`;
const ModalTitle = styled.div`
  color: ${(props) => props.color} !important;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.antd.colorBorderSecondary};
`;

const StyledMenu = styled(Menu)`
  .ant-menu-item-selected {
    color: ${(props) => props.theme.antd["red-6"]} !important;
  }
  .ant-menu-item-active::after {
    border-bottom-color: ${(props) => props.theme.antd["red-6"]} !important;
  }
  .ant-menu-item {
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledDivider = styled(Divider)`
  height: 100%;
  margin-right: 24px;
  margin-left: 24px;
`;
const CancleReasonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AddInfo = styled(Text)`
  width: 10vw;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
  bottom: 0;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
export default CancelOrderModal;
