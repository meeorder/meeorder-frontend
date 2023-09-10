import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import styled from "@emotion/styled";
import { Card, Table } from "antd";
import { type ColumnsType } from "antd/es/table";

const columns:ColumnsType<> = [

]

const IngredientStock = () => {
  return (
    <StyledCard
      title={
        <div style={{
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
        }}>IngredientStock</div>
      }
      extra={
        <CenterContentButton type="primary">
          เติมวัตถุดิบทั้งหมด
        </CenterContentButton>
      }>
      <Table
        columns={columns}
        pagination={false}/>
    </StyledCard>
  );
};

export default IngredientStock;

const StyledCard = styled(Card)`
  flex: 1;
`;