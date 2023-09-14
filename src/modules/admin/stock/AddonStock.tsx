import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import styled from "@emotion/styled";
import { Card, Table } from "antd";

const AddonStock = () => {
  return (
    <StyledCard
      title={<div>จัดการท็อปปิ้ง</div>}
      extra={
        <CenterContentButton type="primary">
          เติมท็อปปิ้งทั้งหมด
        </CenterContentButton>
      }
    >
      <Table pagination={false} />
    </StyledCard>
  );
};

export default AddonStock;

const StyledCard = styled(Card)`
  flex: 1;
`;
