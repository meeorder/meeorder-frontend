import styled from "@emotion/styled";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { Button, ConfigProvider, Modal, Result, Typography, theme } from "antd";
import { useState } from "react";
type BasketSummaryNavProps = {
  totalPrice: number;
};

const BasketSummaryNav: React.FC<BasketSummaryNavProps> = ({ totalPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const {
    token: { colorPrimary, colorBgBase },
  } = theme.useToken();
  const openModal = () => {
    setModalStatus("idle");
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log("handleOk");
    setModalStatus("pending");
    // TODO send order to server
    setTimeout(() => {
      // TODO show response message before close modal
      setModalStatus("success");
      // setModalStatus("error");
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
        onOk={handleOk}
        onCancel={() => {
          if (modalStatus == "pending") return;
          setIsModalOpen(false);
        }}
        confirmLoading={modalStatus == "pending"}
      >
        {(modalStatus == "idle" || modalStatus == "pending") && (
          <Result
            title={
              <Typography.Title
                level={4}
              >{`Send order of ${totalPrice} Baht?`}</Typography.Title>
            }
          />
        )}
        {modalStatus == "success" && (
          <Result
            status="success"
            title={
              <Typography.Title level={4}>{"Order send!"}</Typography.Title>
            }
          />
        )}
        {modalStatus == "error" && (
          <Result
            status="error"
            title={
              <Typography.Title level={4}>
                {"Something went wrong! Please try again."}
              </Typography.Title>
            }
          />
        )}
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
