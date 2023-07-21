import { type PriceData } from "@/modules/mock/orders";
import styled from "@emotion/styled";
import { Divider, Space, Typography } from "antd";

type OrderSummaryPriceProps = {
  priceData: PriceData;
};

const OrderSummaryPrice: React.FC<OrderSummaryPriceProps> = ({ priceData }) => {
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Divider />
      <FlexBetween>
        <StyledText>Order Price</StyledText>
        <StyledText>{priceData.orderPrice.toFixed(2)} THB</StyledText>
      </FlexBetween>
      <FlexBetween>
        <StyledText>Discount</StyledText>
        <StyledText>{priceData.discountPrice.toFixed(2)} THB</StyledText>
      </FlexBetween>
      <Divider />
      <FlexBetween>
        <StyledText strong>Bill Total</StyledText>
        <StyledText strong>{priceData.totalPrice.toFixed(2)} THB</StyledText>
      </FlexBetween>
    </Space>
  );
};

export default OrderSummaryPrice;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled(Typography.Text)`
  font-size: 16px;
`;
