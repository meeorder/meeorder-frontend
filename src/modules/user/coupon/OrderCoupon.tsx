import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { CaretRight, User } from "@phosphor-icons/react";
import { Card, theme } from "antd";

const OrderCoupon = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <OrderCouponContainer onClick={() => alert("go to coupon page")}>
      <OrderCouponContent>
        <StyledIcon>
          <User size={22} color={colorPrimary} weight="duotone" />
        </StyledIcon>
        <StyledText>Use a coupon</StyledText>
        <StyledCaretRight size={32} />
      </OrderCouponContent>
    </OrderCouponContainer>
  );
};

export default OrderCoupon;

const OrderCouponContainer = styled(Card)`
  display: flex;
  margin-top: 20px;
  width: 100%;
  border-radius: 12px;
  .ant-card-body {
    width: 100%;
  }
`;

const OrderCouponContent = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 16px;
  width: 44px !important;
  height: 44px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.antd.colorPrimaryBg};
`;

const StyledText = styled(Text)`
  margin-left: 20px;
  margin-right: auto;
`;

const StyledCaretRight = styled(CaretRight)`
  margin-left: auto;
`;
