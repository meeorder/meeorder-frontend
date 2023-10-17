import Bill from "@/modules/admin/dashboard/Daily/Bill";
import BillAverage from "@/modules/admin/dashboard/Daily/BillAverage";
import Coupon from "@/modules/admin/dashboard/Daily/Coupon";
import Income from "@/modules/admin/dashboard/Daily/Income";
import MenuRank from "@/modules/admin/dashboard/Daily/MenuRank";
import styled from "@emotion/styled";

const Daily = () => {
  return (
    <Container>
      <Bill />
      <Income />
      <Coupon />
      <BillAverage />
      <MenuRank />
    </Container>
  );
};

export default Daily;

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  > :last-child {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }
`;
