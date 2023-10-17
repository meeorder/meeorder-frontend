import CardData from "@/modules/admin/dashboard/Daily/CardData";
import CardTitle from "@/modules/admin/dashboard/Daily/CardTitle";
import { H2, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { CurrencyDollarSimple } from "@phosphor-icons/react";
import { Card } from "antd";

const Income = () => {
  return (
    <Card
      bodyStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardTitle Icon={CurrencyDollarSimple} title="รายรับสุทธิ" />
      <Body>
        <H2
          style={{
            gridRow: "1 / 4",
            borderRight: "1px solid #BFBFBF",
            paddingRight: "32px",
          }}
        >
          13,543 <Text>บาท</Text>
        </H2>
        <CardData title="ยอดขาย" value="15,228 บาท" />
        <CardData title="ส่วนลด" value="-1,685 บาท" />
        <CardData title="ยอดสุทธิ" value="13,543 บาท" />
      </Body>
    </Card>
  );
};

export default Income;

const Body = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
`;
