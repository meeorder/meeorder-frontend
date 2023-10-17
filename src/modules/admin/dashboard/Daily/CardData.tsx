import { H5 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";

type CardDataProps = {
  title: string;
  value: string;
};

const CardData: React.FC<CardDataProps> = ({ title, value }) => {
  return (
    <FlexBetween>
      <H5 style={{ color: "#595959" }}>{title}</H5>
      <FlexBetween>
        <H5>{value}</H5>
      </FlexBetween>
    </FlexBetween>
  );
};

export default CardData;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
