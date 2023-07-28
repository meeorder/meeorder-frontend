import { Text } from "@/modules/common/components/Typography";
import { type PriceData } from "@/modules/mock/orders";
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
        <StyledText>Order Price</StyledText>
        <StyledText>{priceData.orderPrice.toFixed(2)} THB</StyledText>
      </FlexBetween>
      <FlexBetween>
        <StyledText>Discount</StyledText>
        <StyledText>-{priceData.discountPrice.toFixed(2)} THB</StyledText>
      </FlexBetween>
      <Divider style={{ margin: "0px" }} />
      <FlexBetween>
        <StyledText strong>Bill Total</StyledText>
        <StyledText strong>{priceData.totalPrice.toFixed(2)} THB</StyledText>
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
