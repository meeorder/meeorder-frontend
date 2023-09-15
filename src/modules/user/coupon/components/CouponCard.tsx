import { H5, Text } from "@/modules/common/components/Typography";
import { checkImageSrc, commaFormat } from "@/modules/common/utils";
import { type Coupon } from "@/modules/user/coupon/types";
import { useSession } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import { Button, Card, Divider, theme } from "antd";
import Image from "next/image";

type CouponCardProps = {
  coupon: Coupon;
  onClickCoupon: (coupon: Coupon) => void;
  onClickCouponButton: (coupon: Coupon) => void;
};

const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  onClickCoupon,
  onClickCouponButton,
}) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { data: session } = useSession();

  const isInUsed = coupon._id === session?.coupon?._id;
  const isDisabled = !isInUsed && !coupon.redeemable;
  const statusText = isInUsed
    ? "นำคูปองออก"
    : `แลก ${commaFormat(coupon.required_point)} แต้ม`;

  return (
    <StyledCard
      style={{ borderColor: isInUsed ? colorPrimary : "" }}
      onClick={() => onClickCoupon(coupon)}
    >
      <FlexBetweenRow>
        <StyledImage
          width={900}
          height={900}
          style={{ filter: isDisabled ? "grayscale(100%)" : "" }}
          src={checkImageSrc(coupon.image)}
          alt="Coupon image"
        />
        <Divider type="vertical" dashed style={{ height: "80px" }} />
        <FlexBetweenCol>
          <CouponTitle>{coupon.title}</CouponTitle>
          <CouponDescription type="secondary">
            {coupon.description}
          </CouponDescription>
          <StyledStatusButton
            type="primary"
            ghost={isInUsed}
            disabled={isDisabled}
            onClick={(e) => {
              e.stopPropagation();
              onClickCouponButton(coupon);
            }}
          >
            {statusText}
          </StyledStatusButton>
        </FlexBetweenCol>
      </FlexBetweenRow>
    </StyledCard>
  );
};

export default CouponCard;

const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 12px;
  .ant-card-body {
    padding: 0px;
    margin: 0px;
  }
  padding: 24px;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
`;

const FlexBetweenRow = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexBetweenCol = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 5px;
`;

const StyledImage = styled(Image)`
  height: 80px;
  width: 80px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  margin: 4px;
`;

const StyledStatusButton = styled(Button)`
  border-radius: 12px;
  padding-inline: 15px;
  padding-block: 4px;
`;

const CouponTitle = styled(H5)`
  text-align: right;
`;

const CouponDescription = styled(Text)`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
`;
