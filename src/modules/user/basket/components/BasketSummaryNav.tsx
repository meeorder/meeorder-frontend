import { H4, Text } from "@/modules/common/components/Typography";
import { type APIStatus } from "@/modules/common/types";
import { useConfirmOrder } from "@/modules/user/basket/hooks/useBasketStore";
import styled from "@emotion/styled";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { Button, Modal, Result, theme } from "antd";
import { type ResultStatusType } from "antd/es/result";
import { useState } from "react";
type BasketSummaryNavProps = {
  totalPrice: number;
};

type ModalProps = {
  title: string;
  modalStatus: ResultStatusType | undefined;
  onOk?: () => void;
  onCancel?: () => void;
};

type MapStatusToModalProps = Record<APIStatus, ModalProps>;

const BasketSummaryNav: React.FC<BasketSummaryNavProps> = ({ totalPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorPrimary, colorBgBase },
  } = theme.useToken();

  const {
    isIdle,
    isLoading,
    isError,
    isSuccess,
    mutate: confirmOrder,
  } = useConfirmOrder();

  const basketAPIStatus = isIdle
    ? "idle"
    : isLoading
    ? "pending"
    : isError
    ? "error"
    : isSuccess
    ? "success"
    : "idle";

  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmitOrder = () => {
    confirmOrder();
  };
  const handleCancelSendOrder = () => {
    setIsModalOpen(false);
  };
  const mapStatusToModalProps: MapStatusToModalProps = {
    idle: {
      title: `ยืนยันการสั่งอาหาร`,
      subtitle: `ราคารวม ${totalPrice} บาท`,
      modalStatus: "info",
      onOk: handleSubmitOrder,
      onCancel: handleCancelSendOrder,
    },
    pending: {
      title: `กำลังสั่งอาหาร...`,
      modalStatus: "info",
      onOk: () => {
        return;
      },
    },
    success: {
      title: "สั่งอาหารเรียบร้อย!",
      modalStatus: "success",
      onOk: handleCancelSendOrder,
    },
    error: {
      title: "Something went wrong! Please try again.",
      modalStatus: "error",
      onOk: handleCancelSendOrder,
    },
  };

  if (totalPrice === 0) {
    return null;
  }

  return (
    <>
      <BasketSummaryNavWrapper style={{ backgroundColor: colorPrimary }}>
        <H4 style={{ color: colorBgBase, marginLeft: "8px" }}>
          ราคารวม {totalPrice} บาท 
        </H4>
        <OrderButton
          size="large"
          icon={<PaperPlaneRight color={colorPrimary} size={14} />}
          onClick={openModal}
        >
          <Text style={{ color: colorPrimary }}>สั่งอาหาร</Text>
        </OrderButton>
      </BasketSummaryNavWrapper>
      <Modal
        centered
        open={isModalOpen}
        maskClosable={false}
        closable={false}
        onOk={mapStatusToModalProps?.[basketAPIStatus]?.onOk}
        onCancel={mapStatusToModalProps?.[basketAPIStatus]?.onCancel}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        cancelButtonProps={{
          style: {
            display: mapStatusToModalProps?.[basketAPIStatus]?.onCancel
              ? undefined
              : "none",
          },
        }}
        okButtonProps={{
          style: {
            display: mapStatusToModalProps?.[basketAPIStatus]?.onOk
              ? undefined
              : "none",
          },
        }}
        confirmLoading={basketAPIStatus === "pending"}
      >
        <Result
          status={mapStatusToModalProps?.[basketAPIStatus]?.modalStatus}
          title={
            <H4>{mapStatusToModalProps?.[basketAPIStatus]?.title ?? ""}</H4>
          }
          subTitle={
            <Text>
              {mapStatusToModalProps?.[basketAPIStatus]?.subtitle ?? ""}
            </Text>
          }
        />
      </Modal>
    </>
  );
};

export default BasketSummaryNav;

const BasketSummaryNavWrapper = styled.div`
  padding: 20px;
  position: fixed;
  bottom: 64px;
  border-radius: 12px 12px 0 0;
  min-height: 74px;
  width: 100%;
  max-width: 500px;
  /* Children align */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OrderButton = styled(Button)`
  border-radius: 12px !important;
  padding-inline: 20px !important;
  border: 1px solid ${(props) => props.theme.antd.colorPrimary} !important;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* increase space between icon and Text */
  .ant-btn-icon {
    margin-inline-start: 4px;
  }
`;
