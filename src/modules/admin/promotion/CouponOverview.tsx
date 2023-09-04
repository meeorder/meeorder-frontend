import CouponList from "@/modules/admin/promotion/CouponList";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Card } from "antd";

const handleAddCoupon = () => {
  console.log("Add Coupon");
};

const CouponOverview = () => {
  return (
    <CouponOverviewConatiner
      title={
        <H4
          style={{
            marginLeft: "24px",
            marginTop: "20px",
            marginBottom: "16px",
          }}
        >
          คูปอง
        </H4>
      }
      extra={
        <Button
          style={{
            marginRight: "24px",
            marginTop: "20px",
            marginBottom: "16px",
          }}
          type="primary"
          onClick={() => handleAddCoupon()}
        >
          + เพิ่มคูปอง
        </Button>
      }
    >
      <CouponList />
    </CouponOverviewConatiner>
  );
};

export default CouponOverview;

const CouponOverviewConatiner = styled(Card)`
  width: 100%;
  height: 100%;
  .ant-card-head {
    min-height: 52px;
    border-bottom: 0;
  }
  .ant-card-body {
    padding-top: 0;
  }
`;
