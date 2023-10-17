import CardTitle from "@/modules/admin/dashboard/Daily/CardTitle";
import { H2, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Tag } from "@phosphor-icons/react";
import { Card, Progress } from "antd";

const Coupon = () => {
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
          <H2>20</H2> <Text>คูปอง</Text>
        </Flex>
        <Flex>
          <Text>คูปองทั้งหมดที่เปิดใช้งาน</Text>
          <Text>400/1500</Text>
        </Flex>
      </div>
      <Progress percent={Math.round((400 / 1500) * 100)} />
    </Card>
  );
};

export default Coupon;

const Flex = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;
