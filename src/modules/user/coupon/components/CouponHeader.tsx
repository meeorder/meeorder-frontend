import { H3, H5 } from "@/modules/common/components/Typography";
import CouponPoint from "@/modules/user/coupon/components/CouponPoint";
import { session } from "@/modules/user/mock/session";
import styled from "@emotion/styled";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button, Tag, theme } from "antd";
import { useRouter } from "next/router";

const CouponHeader = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const router = useRouter();
  const onClickBackButton = () => {
    void router.push({
      pathname: "/orders",
    });
  };

  return (
    <CouponHeaderContainer>
      <CouponSubHeader>
        <CouponSubHeaderText>เลือกใช้คูปอง</CouponSubHeaderText>
        <BackButton
          onClick={onClickBackButton}
          shape="circle"
          size="large"
          icon={<ArrowLeft size={16} />}
        />
        <StyledTableTag color={colorPrimary}>
          <H5 style={{ color: "inherit" }}>โต๊ะ {session.tableNumber}</H5>
        </StyledTableTag>
      </CouponSubHeader>
      <CouponPoint />
    </CouponHeaderContainer>
  );
};

export default CouponHeader;

const CouponHeaderContainer = styled.div`
  position: fixed;
  z-index: 1;
  background-color: #d5eafb;
  width: 100%;
  max-width: 500px;
  height: 120px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.15);

  padding-top: 20px;
  padding-inline: 20px;
`;

const CouponSubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const CouponSubHeaderText = styled(H3)`
  width: 100%;
  text-align: center;
  position: absolute;
`;

const BackButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTableTag = styled(Tag)`
  border-radius: 12px;
`;
