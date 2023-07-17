import UserBottomNav from "@/modules/layout/components/UserBottomNav";
import UserTopNav from "@/modules/layout/components/UserTopNav";
import WireFrame from "@/modules/mock/components/WireFrame";
import styled from "@emotion/styled";

type UserLayoutProps = {
  mainNode?: React.ReactNode;
};

const UserLayout: React.FC<UserLayoutProps> = ({
  mainNode = <WireFrame contentNode="Main" cardColor="red" height={"100vh"} />,
}) => {
  return (
    <UserLayoutContainer>
      <UserTopNavContainer>
        <UserTopNav />
      </UserTopNavContainer>
      <UserMain>{mainNode}</UserMain>
      <UserBottomNavContainer>
        <UserBottomNav />
      </UserBottomNavContainer>
    </UserLayoutContainer>
  );
};

export default UserLayout;

const UserLayoutContainer = styled.div`
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
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

const UserMain = styled.main``;

const UserBottomNavContainer = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 1;
  background: inherit;
  height: 64px;
`;
