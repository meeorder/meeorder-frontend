import { H5, Text } from "@/modules/common/components/Typography";
import { useUserStore } from "@/modules/common/hooks/useUserStore";
import { tuncateString } from "@/modules/common/utils";
import { useAllUsableCouponsInSession } from "@/modules/user/coupon/hooks/useAllUsableCouponsInSession";
import {
  useSessionStore,
  type Session,
} from "@/modules/user/order/hooks/useSessionStore";
import UserAvatar from "@/modules/user/user/UserAvatar";
import styled from "@emotion/styled";
import { CaretRight } from "@phosphor-icons/react";
import { Button, Card, theme } from "antd";
import { useRouter } from "next/router";

const OrderCoupon = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const router = useRouter();
  const onClickOrderCoupon = () => {
    void router.push({
      pathname: "/coupon",
    });
  };
  // TODO: get from session
  const session = useSessionStore((state) => state.session as Session);
  const user = useUserStore((state) => state.user);
  const { data: coupons } = useAllUsableCouponsInSession();

  const isHeadTable = session.user === user?._id;

  const coupon = coupons?.find((coupon) => coupon._id === session.coupon);

  return (
    <OrderCouponContainer onClick={onClickOrderCoupon}>
      <StyledCard>
        <OrderCouponContent>
          <UserAvatar
            user={
              isHeadTable
                ? user
                : {
                    _id: session.user || "",
                    username: session.user || "",
                    point: 0,
                    role: "user",
                  }
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
            {!isHeadTable && (
              <Text type="secondary">
                {tuncateString(session.user || "", 15)} เป็นเจ้าของบิล
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
