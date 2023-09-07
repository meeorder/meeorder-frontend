import { Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Divider, Space } from "antd";

type OrderSummaryPriceProps = {
  priceData: {
    total_price: number;
    discount_price: number;
    net_price: number;
  };
};

const OrderSummaryPrice: React.FC<OrderSummaryPriceProps> = ({ priceData }) => {
  return (
    <Space direction="vertical" size={8} style={{ display: "flex" }}>
      <Divider style={{ marginTop: "16px", marginBottom: "0px" }} />
      <FlexBetween>
        <StyledText>ราคารวม</StyledText>
        <StyledText>{priceData.total_price.toFixed(2)} บาท</StyledText>
      </FlexBetween>
      <FlexBetween>
        <StyledText>ส่วนลด</StyledText>
        <StyledText>
          {priceData.discount_price > 0 && "-"}
          {priceData.discount_price.toFixed(2)} บาท
        </StyledText>
      </FlexBetween>
      <Divider style={{ margin: "0px" }} />
      <FlexBetween>
        <StyledText strong>ราคาสุทธิ</StyledText>
        <StyledText strong>{priceData.net_price.toFixed(2)} บาท</StyledText>
      </FlexBetween>
    </Space>
  );
};

export default OrderSummaryPrice;

const FlexBetween = styled.div`
  padding-inline: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled(Text)`
  font-size: 16px;
`;
