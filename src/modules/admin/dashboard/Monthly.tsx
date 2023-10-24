import Bill from "@/modules/admin/dashboard/Monthly/Bill";
import Income from "@/modules/admin/dashboard/Monthly/Income";
import styled from "@emotion/styled";

const Monthly = () => {
  return (
    <Container>
      <Income />
      <Bill />
    </Container>
  );
};

export default Monthly;

const Container = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 1fr;
`;
