import AppLayout from "@/modules/AppLayout";
import { All } from "@/modules/admin/dashboard/All";
import Daily from "@/modules/admin/dashboard/Daily";
import Monthly from "@/modules/admin/dashboard/Monthly";
import { H1 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";

const AdminDashboard = () => {
  return (
    <AppLayout layoutType="admin" currentPageId="adminDashboard">
      <H1>Dashboard</H1>
      <Container>
        <Daily />
        <Monthly />
        <All />
      </Container>
    </AppLayout>
  );
};

export default AdminDashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
