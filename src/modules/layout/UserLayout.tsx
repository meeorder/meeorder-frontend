import WireFrame from "@/modules/Mock/components/WireFrame";
import styled from "@emotion/styled";

type UserLayoutProps = {
  topNavNode?: React.ReactNode;
  mainNode?: React.ReactNode;
  bottomNavNode?: React.ReactNode;
};

const UserLayout: React.FC<UserLayoutProps> = ({
  topNavNode = <WireFrame contentNode="Top Nav" cardColor="blue" />,
  mainNode = <WireFrame contentNode="Main" cardColor="red" height={"100vh"} />,
  bottomNavNode = <WireFrame contentNode="Bottom Nav" cardColor="purple" />,
}) => {
  return (
    <UserLayoutContainer>
      <UserTopNav>{topNavNode}</UserTopNav>
      <UserMain>{mainNode}</UserMain>
      <UserBottomNav>{bottomNavNode}</UserBottomNav>
    </UserLayoutContainer>
  );
};

export default UserLayout;

const UserLayoutContainer = styled.div`
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
`;

const UserTopNav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  background: inherit;
  height: 64px;
`;

const UserMain = styled.main``;

const UserBottomNav = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 1;
  background: inherit;
  height: 64px;
`;
