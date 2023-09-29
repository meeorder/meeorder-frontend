import AppLayout from "@/modules/AppLayout";
import styled from "@emotion/styled";

const AccountManagemant = () => {
  return (
    <AppLayout layoutType="admin" currentPageId="adminSetting">
      <MainContainer>AccountManagemant</MainContainer>
    </AppLayout>
  );
};

export default AccountManagemant;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 24px;
`;
