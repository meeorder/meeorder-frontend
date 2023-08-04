import AppLayout from "@/modules/AppLayout";
import ConsoleSection from "@/modules/admin/menu/ConsoleSection";
import MenuSection from "@/modules/admin/menu/MenuSection";
import useMenuSectionMode from "@/modules/admin/menu/hooks/useMenuSectionMode";
import styled from "@emotion/styled";

const AdminMenu = () => {
  const { menuSectionMode, setMenuSectionMode } = useMenuSectionMode();
  return (
    <AppLayout layoutType="admin" currentPageId="adminAddEditMenu">
      <MainContainer>
        <MenuSection
          menuSectionMode={menuSectionMode}
          setMenuSectionMode={setMenuSectionMode}
        />
        <ConsoleSection />
      </MainContainer>
    </AppLayout>
  );
};

export default AdminMenu;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 24px;
`;
