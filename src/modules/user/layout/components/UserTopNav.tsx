import useRestaurantSetting from "@/modules/admin/setting/restaurantManagement/hooks/useRestaurantSetting";
import UserAvatar from "@/modules/common/components/UserAvatar";
import { useClient } from "@/modules/common/hooks/useClient";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { pages } from "@/modules/pageConfig";
import { roleToRoleNumber } from "@/modules/services/users";
import { useSession } from "@/modules/user/order/hooks/useSession";
import styled from "@emotion/styled";
import { Button, Tag } from "antd";
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
      {session?.table && (
        <Tag
          color="success"
          style={{
            padding: "4px 8px",
            borderRadius: "100px",
            position: "absolute",
            top: "50%",
            left: "16px",
            transform: "translateY(-50%)",
          }}
        >
          โต๊ะ {session?.table?.title}
        </Tag>
      )}
      {restaurant?.logo && (
        <Image
          style={{
            width: "48px",
            height: "48px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={restaurant?.logo ?? ""}
          width={1000}
          height={1000}
          alt="logo"
        />
      )}
      <StyledButton
        type="default"
        shape="circle"
        onClick={() => {
          if (isClientLoaded && !user) void router.push("/signin");
          else if ((user?.role || 0) <= roleToRoleNumber["Customer"]) {
            void router.push("/account");
          } else {
            void router.push(pages.accountManagement.path);
          }
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
