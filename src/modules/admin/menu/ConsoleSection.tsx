import MenuFormSection from "@/modules/admin/menu/MenuFormSection";
import AddOnFormSection from "@/modules/admin/menu/addon/AddOnFormSection";
import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import WireFrame from "@/modules/mock/components/WireFrame";
import styled from "@emotion/styled";

const ConsoleSection = () => {
  const { consoleSectionMode } = useConsoleSectionMode();
  return (
    <ConsoleSectionContainer>
      {consoleSectionMode === "edit-menu" ||
      consoleSectionMode === "add-menu" ? (
        <>
          <MenuFormSection />
          <AddOnFormSection />
        </>
      ) : (
        <WireFrame contentNode="category overview" />
      )}
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
