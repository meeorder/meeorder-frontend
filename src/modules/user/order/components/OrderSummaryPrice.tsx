import { Text } from "@/modules/common/components/Typography";
import { type PriceData } from "@/modules/user/mock/orders";
import styled from "@emotion/styled";
import { Divider, Space } from "antd";

type OrderSummaryPriceProps = {
  priceData: PriceData;
};

const OrderSummaryPrice: React.FC<OrderSummaryPriceProps> = ({ priceData }) => {
  return (
    <Space direction="vertical" size={8} style={{ display: "flex" }}>
      <Divider style={{ marginTop: "16px", marginBottom: "0px" }} />
      <FlexBetween>
        <StyledText>ราคารวม</StyledText>
        <StyledText>{priceData.orderPrice.toFixed(2)} บาท</StyledText>
      </FlexBetween>
      <FlexBetween>
        <StyledText>ลด</StyledText>
        <StyledText>-{priceData.discountPrice.toFixed(2)} บาท</StyledText>
      </FlexBetween>
      <Divider style={{ margin: "0px" }} />
      <FlexBetween>
        <StyledText strong>ราคาสุทธิ</StyledText>
        <StyledText strong>{priceData.totalPrice.toFixed(2)} บาท</StyledText>
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
