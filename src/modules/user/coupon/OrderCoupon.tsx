import { H5, Text } from "@/modules/common/components/Typography";
import { coupons } from "@/modules/user/mock/coupons";
import { session } from "@/modules/user/mock/session";
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
  const couponInUsed = !!session.coupon;
  const isHeadTable = session.user?.id === session.headTableUser?.id;

  const coupon = coupons.find((coupon) => coupon.id === session.coupon);

  return (
    <OrderCouponContainer onClick={onClickOrderCoupon}>
      <StyledCard>
        <OrderCouponContent>
          {!isHeadTable ? (
            <UserAvatar image={session.headTableUser?.image} />
          ) : (
            <UserAvatar image={session.user?.image} />
          )}
          <FlexBetweenCol>
            {couponInUsed ? (
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
                {session.headTableUser?.name} เป็นเจ้าของบิล
              </Text>
            )}
          </FlexBetweenCol>
          <StyledCaretRight
            size={32}
            color={couponInUsed ? colorPrimary : ""}
          />
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
