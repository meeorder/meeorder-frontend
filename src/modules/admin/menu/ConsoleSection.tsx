import WireFrame from "@/modules/mock/components/WireFrame";
import styled from "@emotion/styled";

const ConsoleSection = () => {
  return (
    <ConsoleSectionContainer>
      <WireFrame contentNode="MenuForm" cardColor="red" />
    </ConsoleSectionContainer>
  );
};

export default ConsoleSection;

const ConsoleSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;
