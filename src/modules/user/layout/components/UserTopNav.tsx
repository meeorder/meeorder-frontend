import useRestaurantSetting from "@/modules/admin/setting/restaurantManagement/hooks/useResturantSetting";
import { Text } from "@/modules/common/components/Typography";
import UserAvatar from "@/modules/common/components/UserAvatar";
import { useClient } from "@/modules/common/hooks/useClient";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { useSession } from "@/modules/user/order/hooks/useSession";
import styled from "@emotion/styled";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

const UserTopNav = () => {
  const router = useRouter();
  const { isClientLoaded } = useClient();
  const { data: session } = useSession();
  const { data: user } = useUser();
  const { data: restaurant } = useRestaurantSetting();

  return (
    <>
      <Image
        style={{
          width: "48px",
          height: "48px",
        }}
        src={restaurant?.logo ?? ""}
        width={1000}
        height={1000}
        alt="logo"
      />
      <Text
        type="warning"
        style={{
          fontSize: "10px",
          fontFamily: "monospace",
          width: "3rem",
          position: "absolute",
          top: "10px",
          right: "75px",
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
          else void router.push("/account");
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
