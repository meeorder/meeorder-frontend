import { H5, Text } from "@/modules/common/components/Typography";
import UserAvatar from "@/modules/common/components/UserAvatar";
import { useClient } from "@/modules/common/hooks/useClient";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { truncateString } from "@/modules/common/utils";
import { useAllUsableCouponsInSession } from "@/modules/user/coupon/hooks/useAllUsableCouponsInSession";
import { useSession } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import { CaretRight } from "@phosphor-icons/react";
import { Button, Card, theme } from "antd";
import { useRouter } from "next/router";

const OrderCoupon = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const router = useRouter();

  const { isClientLoaded } = useClient();
  const { data: session } = useSession();
  const { data: user } = useUser();
  const { data: coupons } = useAllUsableCouponsInSession();

  const onClickOrderCoupon = () => {
    void router.push({
      pathname: "/coupon",
    });
  };

  const isHeadTable = session?.user?._id === user?._id;
  const coupon = coupons?.find((coupon) => coupon._id === session?.coupon?._id);

  return (
    <OrderCouponContainer onClick={onClickOrderCoupon}>
      <StyledCard>
        <OrderCouponContent>
          <UserAvatar
            user={
              session?.user
                ? {
                    _id: session?.user?._id ?? "",
                    username: session?.user?.username ?? "",
                    point: session?.user?.point ?? 0,
                    role: session?.user?.role.toString() ?? "1",
                  }
                : null
            }
          />
          <FlexBetweenCol>
            {coupon ? (
              <CouponTitle>
                {'"'}
                {coupon?.title}
                {'"'}
              </CouponTitle>
            ) : (
              <H5>เลือกใช้คูปอง</H5>
            )}
            {isClientLoaded && !isHeadTable && (
              <Text type="secondary">
                {truncateString(session?.user?.username ?? "", 15)}{" "}
                เป็นเจ้าของบิล
              </Text>
            )}
          </FlexBetweenCol>
          <StyledCaretRight size={32} color={coupon ? colorPrimary : ""} />
        </OrderCouponContent>
      </StyledCard>
    </OrderCouponContainer>
  );
};

export default OrderCoupon;

const OrderCouponContainer = styled(Button)`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding: 0;
  border-radius: 12px;
  border: none;
`;

const StyledCard = styled(Card)`
  display: flex;
  border-radius: 12px;
  .ant-card-body {
    width: 100%;
    padding: 20px;
  }
`;

const OrderCouponContent = styled.div`
  display: flex;
  align-items: center;
`;

const FlexBetweenCol = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledCaretRight = styled(CaretRight)`
  margin-left: auto;
`;

const CouponTitle = styled(H5)`
  color: ${(props) => props.theme.antd.colorPrimary} !important;
`;
