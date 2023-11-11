import AppLayout from "@/modules/AppLayout";
import AddonStock from "@/modules/admin/stock/AddonStock";
import IngredientStock from "@/modules/admin/stock/IngredientStock";
import styled from "@emotion/styled";

const Stock = () => {
  return (
    <AppLayout layoutType="admin" currentPageId="employeeStock">
      <MainContainer>
        <IngredientStock />
        <AddonStock />
      </MainContainer>
    </AppLayout>
  );
};

export default Stock;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 24px;
  .ant-table-body {
    overflow-y: auto !important;
    height: calc(100vh - 240px);
  }
`;
