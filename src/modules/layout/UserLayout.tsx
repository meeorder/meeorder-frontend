import { type PageId } from "@/modules/config/pageConfig";
import UserBottomNav from "@/modules/layout/components/UserBottomNav";
import UserTopNav from "@/modules/layout/components/UserTopNav";
import WireFrame from "@/modules/mock/components/WireFrame";
import styled from "@emotion/styled";

type UserLayoutProps = {
  mainNode?: React.ReactNode;
  currentPageId: PageId;
};

const UserLayout: React.FC<UserLayoutProps> = ({
  mainNode = <WireFrame contentNode="Main" cardColor="red" height={"100vh"} />,
  currentPageId,
}) => {
  return (
    <UserLayoutContainer>
      <UserTopNavContainer>
        <UserTopNav />
      </UserTopNavContainer>
      <UserMainContainer>{mainNode}</UserMainContainer>
      <UserBottomNavContainer>
        <UserBottomNav currentPageId={currentPageId} />
      </UserBottomNavContainer>
    </UserLayoutContainer>
  );
};

export default UserLayout;

const UserLayoutContainer = styled.div`
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background-color: white;
`;

const UserTopNavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 64px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const UserMainContainer = styled.main``;

const UserBottomNavContainer = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 1;
  background: inherit;
  height: 64px;
`;
