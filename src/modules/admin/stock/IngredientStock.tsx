import WireFrame from "@/modules/mock/components/WireFrame";
import styled from "@emotion/styled";
import { Card } from "antd";

const IngredientStock = () => {
  return (
    <StyledCard title={<div>IngredientStock</div>}>
      <WireFrame height={"500px"} />
    </StyledCard>
  );
};

export default IngredientStock;

const StyledCard = styled(Card)`
  flex: 1;
`;
