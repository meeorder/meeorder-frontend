import CardData from "@/modules/admin/dashboard/Daily/CardData";
import CardTitle from "@/modules/admin/dashboard/Daily/CardTitle";
import { useTotalReceiptAmountToday } from "@/modules/admin/dashboard/Daily/hooks";
import { H2, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { CallBell } from "@phosphor-icons/react";
import { Card } from "antd";

const Bill = () => {
  const { data } = useTotalReceiptAmountToday();
  return (
    <Card
      bodyStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardTitle Icon={CallBell} title="จำนวนบิล" />
      <Body>
        <H2
          style={{
            gridRow: "1 / 3",
            borderRight: "1px solid #BFBFBF",
            paddingRight: "32px",
          }}
        >
          {data?.all_receipt ?? 0} <Text>บิล</Text>
        </H2>
        <CardData
          title="เป็นสมาชิก"
          value={`${data?.receipt_user ?? ""} บิล`}
        />
        <CardData
          title="ไม่เป็นสมาชิก"
          value={`${data?.receipt_no_user ?? ""} บิล`}
        />
      </Body>
    </Card>
  );
};

export default Bill;

const Body = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
`;
