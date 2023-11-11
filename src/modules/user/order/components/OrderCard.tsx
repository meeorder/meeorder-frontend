import useUpdateOrderStatusToCancel from "@/modules/admin/order/hook/useUpdateOrderStatusToCancel";
import TextPrice from "@/modules/common/components/TextPrice";
import { H5, Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { checkImageSrc } from "@/modules/common/utils";
import { roleToRoleNumber } from "@/modules/services/users";
import { type OrdersWithPriceData } from "@/modules/user/order/hooks/useOrder";
import { calculateOrderPrice } from "@/modules/user/order/utils";
import styled from "@emotion/styled";
import { Button, Card, Popconfirm, Tag, type TagProps } from "antd";
import Image from "next/image";

type Order = OrdersWithPriceData["orders"][number];

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const colorTag = mapStatusToColor[order?.status];
  const { mutate } = useUpdateOrderStatusToCancel();
  const { data: user } = useUser();
  return (
    <StyledCard>
      <FlexBetweenRow>
        <FlexBetweenCol>
          <Text
            type="secondary"
            style={{
              fontSize: 12,
              marginBlock: -8,
            }}
          >
            {new Date(order?.created_at).toLocaleTimeString("th-TH", {
              hour12: false,
              timeStyle: "short",
            })}
          </Text>
          <H5>{order?.menu?.title}</H5>
          <Text type="secondary">
            <TextPrice price={calculateOrderPrice(order)} />
            <StyledStatusTag color={colorTag}>
              {mapOrderStatusTranslation[order.status]}
            </StyledStatusTag>
          </Text>
          {order?.addons?.map((addon) => {
            return (
              <Text type="secondary" key={addon?._id}>
                {addon?.title}
              </Text>
            );
          })}
          {order?.additional_info && (
            <Text type="secondary">เพิ่มเติม: {order?.additional_info}</Text>
          )}
          {user?.role &&
            user?.role >= roleToRoleNumber["Cashier"] &&
            order.status !== "CANCELLED" && (
              <>
                <Popconfirm
                  title="ยกเลิกออเดอร์"
                  description="ยกเลิกออเดอร์นี้หรือไม่"
                  onConfirm={() => {
                    mutate({ id: order?._id, reasons: ["ยกเลิกโดยแคชเชียร์"] });
                  }}
                  okText="ตกลง"
                  cancelText="ไม่"
                  okType="danger"
                >
                  <Button type="primary" danger>
                    ยกเลิกออเดอร์นี้
                  </Button>
                </Popconfirm>
              </>
            )}
        </FlexBetweenCol>
        <StyledImage
          width={900}
          height={900}
          src={checkImageSrc(order?.menu?.image ?? "")}
          alt={order?.menu?.title}
        />
      </FlexBetweenRow>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 12px;
  .ant-card-body {
    padding: 0px;
    margin: 0px;
  }
`;

const StyledStatusTag = styled(Tag)`
  border-radius: 12px;
  margin-left: 12px;
`;

const StyledImage = styled(Image)`
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  margin: 8px;
`;

const FlexBetweenRow = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FlexBetweenCol = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  gap: 8px;
`;

const mapStatusToColor: Record<Order["status"], TagProps["color"]> = {
  IN_QUEUE: "orange",
  PREPARING: "geekblue",
  READY_TO_SERVE: "blue",
  DONE: "green",
  CANCELLED: "red",
};

const mapOrderStatusTranslation: Record<Order["status"], string> = {
  IN_QUEUE: "อยู่ในคิว",
  PREPARING: "กำลังเตรียมอาหาร",
  READY_TO_SERVE: "พร้อมเสิร์ฟ",
  DONE: "สำเร็จ",
  CANCELLED: "ยกเลิก",
};

export default OrderCard;
