import CardTitle from "@/modules/admin/dashboard/Daily/CardTitle";
import { useTotalCouponUsageToday } from "@/modules/admin/dashboard/Daily/hooks";
import useAllCoupon from "@/modules/admin/promotion/hook/useAllCoupon";
import { H2, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Tag } from "@phosphor-icons/react";
import { Card, Progress } from "antd";

const Coupon = () => {
  const { data } = useTotalCouponUsageToday();
  const { data: allCoupon } = useAllCoupon();
  const allCouponAmount =
    allCoupon?.reduce((acc, cur) => acc + cur.quota, 0) || 0;
  const allCouponUsage =
    allCoupon?.reduce((acc, cur) => acc + cur.redeemed, 0) || 0;
  return (
    <Card
      bodyStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardTitle Icon={Tag} title="จำนวนคูปองที่ถูกใช้" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Flex>
          <H2>{data?.couponUsageToday}</H2> <Text>คูปอง</Text>
        </Flex>
        <Flex>
          <Text>คูปองทั้งหมดที่เปิดใช้งาน</Text>
          <Text>
            {allCouponUsage}/{allCouponAmount}
          </Text>
        </Flex>
      </div>
      <Progress
        percent={Math.round((allCouponUsage / allCouponAmount) * 100)}
      />
    </Card>
  );
};

export default Coupon;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;
