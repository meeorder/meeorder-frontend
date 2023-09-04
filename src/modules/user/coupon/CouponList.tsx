import CouponCard from "@/modules/user/coupon/CouponCard";
import { type Coupon } from "@/modules/user/mock/coupons";
import styled from "@emotion/styled";
import { Space } from "antd";
import React from "react";

type CouponListProps = {
  coupons: Coupon[];
  onClickCoupon: (coupon: Coupon) => void;
  onClickCouponButton: (coupon: Coupon) => void;
};

const CouponList: React.FC<CouponListProps> = ({
  coupons,
  onClickCoupon,
  onClickCouponButton,
}) => {
  return (
    <StyledSpace direction="vertical" size={8} style={{ display: "flex" }}>
      {coupons.map((coupon) => {
        return (
          <CouponCard
            key={coupon.id}
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
