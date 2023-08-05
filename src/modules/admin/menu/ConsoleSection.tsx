import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import WireFrame from "@/modules/mock/components/WireFrame";
import styled from "@emotion/styled";
import { Button } from "antd";

const ConsoleSection = () => {
  const { consoleSectionMode, editMenuId, changeToCategoryMode } =
    useConsoleSectionMode();
  return (
    <ConsoleSectionContainer>
      <WireFrame
        contentNode={
          <div>
            {"console Mode : " +
              consoleSectionMode +
              " menu id : " +
              (editMenuId || "undefined")}
            <Button onClick={changeToCategoryMode}>Change to category</Button>
          </div>
        }
        cardColor="red"
      />
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
