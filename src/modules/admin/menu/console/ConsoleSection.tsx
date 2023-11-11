import AddOnFormSection from "@/modules/admin/menu/console/AddOnFormSection";
import CategoryOverview from "@/modules/admin/menu/console/CategoryOverview";
import MenuFormSection from "@/modules/admin/menu/console/MenuFormSection";
import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
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
        <CategoryOverview />
      )}
    </ConsoleSectionContainer>
  );
};

export default ConsoleSection;

const ConsoleSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: calc(100% - 424px);
`;
