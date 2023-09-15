import { Text } from "@/modules/common/components/Typography";
import UserAvatar from "@/modules/common/components/UserAvatar";
import { useClient } from "@/modules/common/hooks/useClient";
import { useUserStore } from "@/modules/common/hooks/useUserStore";
import { useSessionStore } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

const UserTopNav = () => {
  const router = useRouter();
  const { isClientLoaded } = useClient();

  const session = useSessionStore((state) => state.session);
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Image
        style={{
          width: "200px",
          height: "100px",
        }}
        src="/image/logo.png"
        width={200}
        height={100}
        alt="logo"
      />
      <Text
        type="warning"
        style={{
          fontSize: "10px",
          fontFamily: "monospace",
          width: "3rem",
        }}
      >
        {isClientLoaded && session?._id}
      </Text>
      <StyledButton
        type="default"
        shape="circle"
        // TODO: If already signed in, go to profile page?
        onClick={() => {
          if (isClientLoaded && !user) void router.push("/signin");
        }}
      >
        <UserAvatar user={user} />
      </StyledButton>
    </>
  );
};

export default UserTopNav;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 16px;
  width: 44px !important;
  height: 44px;
  border: none;
`;
