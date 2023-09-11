import WireFrame from "@/modules/mock/components/WireFrame";
import styled from "@emotion/styled";
import { Card } from "antd";

const AddonStock = () => {
  return (
    <StyledCard title={<div>addonStock</div>}>
      <WireFrame height={"500px"} />
    </StyledCard>
  );
};

export default AddonStock;

const StyledCard = styled(Card)`
  flex: 1;
`;
