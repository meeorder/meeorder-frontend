import {
  Text,
  type TypographyTextProps,
} from "@/modules/common/components/Typography";
import { transientOptions } from "@/modules/common/transientOptions";
import styled from "@emotion/styled";
import { type CSSProperties } from "react";

type TextPriceProps = TypographyTextProps & {
  price: number;
  color?: CSSProperties["color"];
};

const TextPrice: React.FC<TextPriceProps> = ({
  price,
  color,
  ...restProps
}) => {
  return (
    <StyledPrice $color={color} {...restProps}>
      ฿{price}
    </StyledPrice>
  );
};

export default TextPrice;

type StyledPriceProps = {
  $color?: CSSProperties["color"];
};

const StyledPrice = styled(Text, transientOptions)<StyledPriceProps>`
  color: ${(props) =>
    props.$color ? props.$color : props.theme.antd.colorPrimaryText};
`;
