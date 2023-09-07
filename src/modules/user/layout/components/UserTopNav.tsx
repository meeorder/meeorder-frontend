import { Text } from "@/modules/common/components/Typography";
import { useClient } from "@/modules/common/hooks/useClient";
import { useSessionStore } from "@/modules/user/order/hooks/useSessionStore";
import styled from "@emotion/styled";
import { User } from "@phosphor-icons/react";
import { Button, theme } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

const UserTopNav = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const router = useRouter();
  const { isClientLoaded } = useClient();

  const session = useSessionStore((state) => state.session);

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
        icon={<User size={22} color={colorPrimary} weight="duotone" />}
        onClick={() => void router.push("/signin")}
      />
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
  background-color: ${(props) => props.theme.antd.colorPrimaryBg};
`;
