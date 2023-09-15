import CouponCard from "@/modules/user/coupon/components/CouponCard";
import { useAllUsableCouponsInSession } from "@/modules/user/coupon/hooks/useAllUsableCouponsInSession";
import { type Coupon } from "@/modules/user/coupon/types";
import { useSession } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import { Space } from "antd";
import React from "react";

type CouponListProps = {
  onClickCoupon: (coupon: Coupon) => void;
  onClickCouponButton: (coupon: Coupon) => void;
};

const CouponList: React.FC<CouponListProps> = ({
  onClickCoupon,
  onClickCouponButton,
}) => {
  const { data: session } = useSession();
  const { data: coupons } = useAllUsableCouponsInSession();

  const inUsedArray =
    coupons?.filter((coupon) => coupon._id === session?.coupon?._id) ?? [];
  const redeemableArray =
    coupons?.filter(
      (coupon) => coupon.redeemable && !inUsedArray?.includes(coupon),
    ) ?? [];
  const disableArray =
    coupons?.filter(
      (coupon) => !coupon.redeemable && !inUsedArray?.includes(coupon),
    ) ?? [];

  const sortedCoupons = [...inUsedArray, ...redeemableArray, ...disableArray];

  return (
    <StyledSpace direction="vertical" size={8} style={{ display: "flex" }}>
      {sortedCoupons?.map((coupon) => {
        return (
          <CouponCard
            key={coupon._id}
            coupon={coupon}
            onClickCoupon={onClickCoupon}
            onClickCouponButton={onClickCouponButton}
          />
        );
      })}
    </StyledSpace>
  );
};

export default CouponList;

const StyledSpace = styled(Space)`
  display: flex;
`;
