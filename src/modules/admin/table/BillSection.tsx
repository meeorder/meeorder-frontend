import { useSelectedTableStore } from "@/modules/admin/table/hooks/useSelectedTableStore";
import {
  useFinishSession,
  useGetOrdersByTableId,
} from "@/modules/admin/table/hooks/useSessionBill";
import { useAllTable } from "@/modules/admin/table/hooks/useTables";
import { GenMetadataFromTable, useColor } from "@/modules/admin/table/utils";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H2, H3, H4, Text } from "@/modules/common/components/Typography";
import { type GetTableByIdResponse } from "@/modules/services/tables";
import styled from "@emotion/styled";
import { PencilSimpleLine, Plus, Printer } from "@phosphor-icons/react";
import {
  Button,
  ConfigProvider,
  Divider,
  Empty,
  Form,
  InputNumber,
  Modal,
  QRCode,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";

const RenderOrder: React.FC<{
  order: GetTableByIdResponse["session"]["orders"][number];
}> = ({ order }) => {
  const priceWithAddons =
    order.menu.price +
    order.addons.reduce((acc, addon) => {
      return acc + addon.price;
    }, 0);
  return (
    <div key={order._id}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text>{order.menu.title}</Text>
        <Text>{priceWithAddons} บาท</Text>
      </div>
      {order?.addons?.map((addon) => {
        if (typeof addon === "string") return null;
        return (
          <Text
            style={{ display: "block", textIndent: "20px" }}
            key={order._id + addon?._id}
          >
            + {addon.title} {addon.price} บาท
          </Text>
        );
      })}
    </div>
  );
};

const BillSection = () => {
  const { tableId, mode, setMode, clearTableId } = useSelectedTableStore();
  const { data: tables } = useAllTable();
  const { data: bill } = useGetOrdersByTableId(tableId);
  // BUG not revalidate when finish session
  const { mutate: finishSession } = useFinishSession(tableId);
  const metadata = GenMetadataFromTable(
    tables?.find((table) => table._id === tableId) ?? undefined,
  );
  const color = useColor(metadata);
  const table = tables?.find((table) => table._id === tableId);
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [form] = Form.useForm<{ cash: number }>();
  const cash = Form.useWatch("cash", form);
  const orders = bill?.session?.orders.filter(
    (order) => order.status !== "CANCELLED",
  );
  const unfinishedOrders = orders?.filter((order) => order.status !== "DONE");
  const finishedOrders = orders?.filter((order) => order.status === "DONE");
  const {
    token: { colorSuccess, geekblue6, geekblue3 },
  } = theme.useToken();
  // when tableId change, reset mode
  useEffect(() => {
    setIsEditingOrder(false);
    setIsCheckoutModalOpen(false);
  }, [tableId]);
  // when close checkout modal, reset form
  useEffect(() => {
    form.resetFields();
  }, [isCheckoutModalOpen, form]);
  /* ------------------------------ In edit mode ------------------------------ */
  if (mode === "edit") {
    return (
      <BillContainer>
        <Empty
          style={{ margin: "auto" }}
          description="อยู่ในโหมดแก้ไขโต๊ะ"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </BillContainer>
    );
  }
  /* ----------------------- Not Selected or no session ----------------------- */
  if (tableId === "" || !bill?.session) {
    return (
      <BillContainer>
        <Empty
          style={{ margin: "auto" }}
          description="กรุณาเลือกโต๊ะ"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </BillContainer>
    );
  }
  /* --------------------------- In edit order mode --------------------------- */
  if (isEditingOrder) {
    return (
      <BillContainer>
        <iframe
          style={{ height: "100%", width: "100%" }}
          src={`/?session-id=${bill?.session?._id ?? "no-session"}`}
          title="W3Schools Free Online Web Tutorials"
        />
      </BillContainer>
    );
  }
  return (
    <>
      <BillContainer>
        <HeadSection style={{ background: color.backgroundColor }}>
          <div onClick={() => setIsQRModalOpen(true)}>
            <QRCode size={83} value="-" color={color.titleColor} />
          </div>
          <div
            style={{
              flex: 1,
              justifySelf: "center",
              textAlign: "center",
            }}
          >
            <H2 style={{ color: color.titleColor }}>
              {table?.title ?? "ไม่พบโต๊ะ"}
            </H2>
            <Text style={{ color: color.titleColor }}>
              {metadata.statusName ?? "ไม่ทราบสถานะ"}
            </Text>
          </div>
          <div style={{ textAlign: "end" }}>
            <Text style={{ color: color.titleColor }}>
              เวลา{" "}
              {table == undefined
                ? null
                : new Date(table?.session_create_at).toLocaleString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
            </Text>
            <br />
            <Text style={{ color: color.titleColor }}>
              {table == undefined ? null : metadata.durationTime} นาที
            </Text>
          </div>
        </HeadSection>
        <BillOrdersSection>
          {!!unfinishedOrders?.length && (
            <ConfigProvider
              theme={{
                token: {
                  colorText: geekblue6,
                  colorBorderSecondary: geekblue3,
                },
              }}
            >
              <Divider style={{ margin: 0 }}>เมนูที่ยังไม่สำเร็จ</Divider>
              {unfinishedOrders?.map((order) => {
                return <RenderOrder key={order._id} order={order} />;
              })}
              <Divider />
            </ConfigProvider>
          )}
          {!!finishedOrders?.length && (
            <>
              {finishedOrders?.map((order) => {
                return (
                  <>
                    <RenderOrder key={order._id} order={order} />
                  </>
                );
              })}
              <Divider />
            </>
          )}
          {bill?.session?.coupon && (
            <>
              <H4>คูปอง</H4>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>ส่วนลด {bill?.session?.coupon?.title}</Text>
                <Text>- {bill?.session?.coupon?.discount} บาท</Text>
              </div>
              <Divider />
            </>
          )}
        </BillOrdersSection>
        <ActionSection>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <H3>ยอดรวม</H3>
            <H3>{table?.totalPrice.toLocaleString()} บาท</H3>
          </div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <Button block size="large" icon={<Printer />}>
              ปริ๊นใบเสร็จ
            </Button>
            <Button
              onClick={() => setIsEditingOrder(true)}
              block
              size="large"
              icon={<PencilSimpleLine />}
            >
              แก้ไขออเดอร์
            </Button>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: colorSuccess,
              },
            }}
          >
            <Button
              onClick={() => setIsCheckoutModalOpen(true)}
              block
              size="large"
              type="primary"
              disabled={table?.unfinishOrdersCount !== 0}
            >
              ชำระเงิน
            </Button>
          </ConfigProvider>
        </ActionSection>
      </BillContainer>
      {/* -------------------------------- QR Modal -------------------------------- */}
      <Modal
        centered
        title={`QrCode สำหรับสั่งอาหาร [โต๊ะ ${table?.title ?? ""}]`}
        open={isQRModalOpen}
        onCancel={() => {
          setIsQRModalOpen(false);
        }}
        footer={
          <Button
            type="primary"
            icon={<Printer />}
            onClick={() => {
              setIsQRModalOpen(false);
            }}
          >
            ปริ๊นใบเสร็จ
          </Button>
        }
      >
        <QRCode
          style={{
            position: "relative",
            marginInline: "auto",
          }}
          size={300}
          value={window.location.origin + `?session-id=${table?.session ?? ""}`}
        />
      </Modal>
      {/* ----------------------------- Checkout Modal ----------------------------- */}
      <Modal
        centered
        open={isCheckoutModalOpen}
        onCancel={() => {
          setIsCheckoutModalOpen(false);
        }}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {cash - (table?.totalPrice ?? 0) >= 0 && (
              <H4 style={{ marginRight: "12px" }}>
                เงินทอน {(cash - (table?.totalPrice ?? 0)).toLocaleString()} บาท
              </H4>
            )}
            <CenterContentButton
              type="primary"
              disabled={cash < (table?.totalPrice ?? 0)}
              onClick={() => {
                finishSession(table?.session ?? "");
                setIsCheckoutModalOpen(false);
              }}
            >
              ยืนยันชำระเงิน
            </CenterContentButton>
          </div>
        }
      >
        <H3>{`ชำะเงิน โต๊ะ ${table?.title ?? ""} รวม ${
          table?.totalPrice.toLocaleString() ?? ""
        } บาท`}</H3>
        <div>
          <Form
            initialValues={{ cash: 0 }}
            key={isCheckoutModalOpen.toString()}
            form={form}
            layout="vertical"
          >
            <Form.Item label="รับเงินสด" name={"cash"}>
              <InputNumber
                style={{ width: "100%" }}
                placeholder="input placeholder"
              />
            </Form.Item>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                width: "100%",
                gap: "8px",
              }}
            >
              <Button
                icon={<Plus />}
                onClick={() => {
                  form.setFieldValue("cash", form.getFieldsValue().cash + 100);
                }}
              >
                100
              </Button>
              <Button
                icon={<Plus />}
                onClick={() => {
                  form.setFieldValue("cash", form.getFieldsValue().cash + 500);
                }}
              >
                500
              </Button>
              <Button
                icon={<Plus />}
                onClick={() => {
                  form.setFieldValue("cash", form.getFieldsValue().cash + 1000);
                }}
              >
                1,000
              </Button>
              <Button
                onClick={() => {
                  form.setFieldValue("cash", table?.totalPrice ?? 0);
                }}
              >
                พอดี
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default BillSection;

const BillContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 390px;
`;
const HeadSection = styled.div`
  height: 143px;
  padding: 20px;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
`;

const BillOrdersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-inline: 20px;
  padding-block: 8px;
  height: 100%;
  flex: 1;
  overflow-y: auto;
`;

const ActionSection = styled.div`
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.15);
  padding: 20px;
`;
