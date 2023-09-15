import { useClient } from "@/modules/common/hooks/useClient";
import WireFrame from "@/modules/mock/components/WireFrame";
import { type PageId } from "@/modules/pageConfig";
import UserBottomNav from "@/modules/user/layout/components/UserBottomNav";
import UserTopNav from "@/modules/user/layout/components/UserTopNav";
import { useSession } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";

type UserLayoutProps = {
  mainNode?: React.ReactNode;
  currentPageId: PageId;
};

const UserLayout: React.FC<UserLayoutProps> = ({
  mainNode = <WireFrame contentNode="Main" cardColor="red" height={"100vh"} />,
  currentPageId,
}) => {
  const { data: session } = useSession();
  const { isClientLoaded } = useClient();

  return (
    <UserLayoutContainer>
      <UserTopNavContainer>
        <UserTopNav />
      </UserTopNavContainer>
      <UserMainContainer>{mainNode}</UserMainContainer>
      {isClientLoaded && session && (
        <UserBottomNavContainer>
          <UserBottomNav currentPageId={currentPageId} />
        </UserBottomNavContainer>
      )}
    </UserLayoutContainer>
  );
};

export default UserLayout;

const UserLayoutContainer = styled.div`
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.antd.colorBgBase};
`;

const UserTopNavContainer = styled.nav`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 64px;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.antd.colorBgBase};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const UserMainContainer = styled.main`
  background-color: ${(props) => props.theme.antd.colorBgBase};
  padding-block: 64px;
`;

const UserBottomNavContainer = styled.nav`
  position: fixed;
  max-width: 500px;
  width: 100%;
  bottom: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.antd.colorBgBase};
  height: 64px;
`;
