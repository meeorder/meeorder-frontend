import CardData from "@/modules/admin/dashboard/Daily/CardData";
import CardTitle from "@/modules/admin/dashboard/Daily/CardTitle";
import { useIncomePerReceiptToday } from "@/modules/admin/dashboard/Daily/hooks";
import { H2, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Money } from "@phosphor-icons/react";
import { Card } from "antd";

const BillAverage = () => {
  const { data } = useIncomePerReceiptToday();
  return (
    <Card
      bodyStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardTitle Icon={Money} title="รายได้ต่อบิลโดยเฉลี่ย" />
      <Body>
        <H2
          style={{
            gridRow: "1 / 3",
            borderRight: "1px solid #BFBFBF",
            paddingRight: "32px",
          }}
        >
          {data?.income_per_receipt.toFixed(2)} <Text>บาท/บิล</Text>
        </H2>
        <CardData
          title="จำนวนบิล"
          value={`${data?.receipt_amount ?? ""} บาท`}
        />
        <CardData title="รายรับสุทธิ" value={`${data?.net_income ?? ""} บาท`} />
      </Body>
    </Card>
  );
};

export default BillAverage;

const Body = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
`;
