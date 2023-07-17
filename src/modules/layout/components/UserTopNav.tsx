import { transientOptions } from "@/modules/common/transientOptions";
import styled from "@emotion/styled";
import { User } from "@phosphor-icons/react";
import { Button, theme } from "antd";
import Image from "next/image";

const UserTopNav = () => {
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = theme.useToken();

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
      <StyledButton
        $colorPrimaryBg={colorPrimaryBg}
        type="default"
        shape="circle"
        icon={<User size={22} color={colorPrimary} weight="duotone" />}
      />
    </>
  );
};

export default UserTopNav;

type StyledButtonProps = {
  $colorPrimaryBg: string;
};

const StyledButton = styled(Button, transientOptions)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 16px;
  width: 44px !important;
  height: 44px;
  border: none;
  background-color: ${(props) => props.$colorPrimaryBg};
`;
