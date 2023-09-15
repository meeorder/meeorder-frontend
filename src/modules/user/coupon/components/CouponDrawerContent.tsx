import { H3, H5, Text } from "@/modules/common/components/Typography";
import { checkImageSrc, commaFormat } from "@/modules/common/utils";
import { type Coupon } from "@/modules/user/coupon/types";
import { useSession } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import { Button } from "antd";
import Image from "next/image";

type CouponDrawerContentProps = {
  coupon?: Coupon;
  onClickCouponButton: (coupon: Coupon) => void;
};

const CouponDrawerContent: React.FC<CouponDrawerContentProps> = ({
  coupon,
  onClickCouponButton,
}) => {
  const { data: session } = useSession();

  if (!coupon) return;

  const isInUsed = coupon._id === session?.coupon?._id;
  const isDisabled = !isInUsed && !coupon.redeemable;
  const statusText = isInUsed
    ? "นำคูปองออก"
    : `แลกใช้ ${commaFormat(coupon.required_point)} แต้ม`;

  return (
    <CouponDrawerContentContainer>
      <CouponHeader>
        <CouponHeaderImage
          src={checkImageSrc(coupon.image)}
          alt="Coupon image"
          width={900}
          height={900}
        />
        <CouponHeaderText>
          <H3>{coupon.title}</H3>
        </CouponHeaderText>
      </CouponHeader>
      <CouponDetail>
        <Text>{coupon.description}</Text>
      </CouponDetail>
      {!isDisabled && (
        <CouponButton
          type="primary"
          ghost={isInUsed}
          onClick={() => onClickCouponButton(coupon)}
        >
          <H5 style={{ color: "inherit" }}>{statusText}</H5>
        </CouponButton>
      )}
    </CouponDrawerContentContainer>
  );
};

export default CouponDrawerContent;

const CouponDrawerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  border-radius: 12px 12px 0px 0px;
`;

const CouponHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CouponHeaderImage = styled(Image)`
  height: 80px;
  width: 80px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  margin-left: 16px;
`;

const CouponHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CouponDetail = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

const CouponButton = styled(Button)`
  border-radius: 12px;
  padding-inline: 15px;
  padding-block: 4px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;
