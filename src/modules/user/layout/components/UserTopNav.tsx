import UserAvatar from "@/modules/user/user/UserAvatar";
import styled from "@emotion/styled";
import { Button } from "antd";
import Image from "next/image";

const UserTopNav = () => {
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
      <StyledButton type="default" shape="circle" icon={<UserAvatar />} />
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
