import { type APIStatus } from "@/modules/common/types";
import styled from "@emotion/styled";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { Button, ConfigProvider, Modal, Result, Typography, theme } from "antd";
import { type ResultStatusType } from "antd/es/result";
import { useState } from "react";
type BasketSummaryNavProps = {
  totalPrice: number;
};

type ModalProps = {
  title: string;
  modalStatus: ResultStatusType | undefined;
};

type MapStatusToModalProps = Record<APIStatus, ModalProps>;

const BasketSummaryNav: React.FC<BasketSummaryNavProps> = ({ totalPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAPIStatus, setModalStatus] = useState<APIStatus>("idle");
  const {
    token: { colorPrimary, colorBgBase },
  } = theme.useToken();
  const openModal = () => {
    setModalStatus("idle");
    setIsModalOpen(true);
  };
  const mapStatusToModalProps: MapStatusToModalProps = {
    error: {
      title: "Something went wrong! Please try again.",
      modalStatus: "error",
    },
    success: {
      title: "Order send!",
      modalStatus: "success",
    },
    pending: {
      title: `Sending order of ${totalPrice} Baht...`,
      modalStatus: "info",
    },
    idle: {
      title: `Send order of ${totalPrice} Baht?`,
      modalStatus: "info",
    },
  };
  const handleSubmitOrder = () => {
    console.log("handleOk");
    setModalStatus("pending");
    // TODO send order to server
    setTimeout(() => {
      // TODO show response message before close modal
      // setModalStatus("success");
      setModalStatus("error");
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    }, 2000);
  };

  return (
    <>
      <BasketSummaryNavWrapper style={{ backgroundColor: colorPrimary }}>
        <Typography.Title
          style={{ color: colorBgBase, margin: 0, marginLeft: "8px" }}
          level={4}
        >
          Total {totalPrice} Baht
        </Typography.Title>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                borderRadiusLG: 12,
                paddingContentHorizontal: 20,
              },
            },
          }}
        >
          <OrderButton
            size="large"
            icon={<PaperPlaneRight color={colorPrimary} size={14} />}
            onClick={openModal}
          >
            <Typography.Text style={{ color: colorPrimary }}>
              Order
            </Typography.Text>
          </OrderButton>
        </ConfigProvider>
      </BasketSummaryNavWrapper>
      <Modal
        centered={true}
        open={isModalOpen}
        maskClosable={false}
        closable={false}
        onOk={handleSubmitOrder}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        cancelButtonProps={{
          disabled: modalAPIStatus === "pending",
          style: { display: modalAPIStatus === "success" ? "none" : undefined },
        }}
        confirmLoading={modalAPIStatus === "pending"}
      >
        <Result
          status={mapStatusToModalProps?.[modalAPIStatus]?.modalStatus}
          title={
            <Typography.Title level={4}>
              {mapStatusToModalProps?.[modalAPIStatus]?.title ?? ""}
            </Typography.Title>
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
  /* increase space between icon and Text */
  .ant-btn-icon {
    margin-inline-end: 10px !important;
    margin-inline-start: 4px;
  }
`;
