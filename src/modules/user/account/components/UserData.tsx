import { H3, H4, H5 } from "@/modules/common/components/Typography";
import UserAvatar from "@/modules/common/components/UserAvatar";
import { useUser } from "@/modules/common/hooks/useUserStore";
import styled from "@emotion/styled";
import { Ticket } from "@phosphor-icons/react";
import { Button, theme } from "antd";
import { useRouter } from "next/router";

const UserData = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const router = useRouter();
  const { data: user } = useUser();

  const onClickCouponButton = () => {
    void router.push({
      pathname: "/coupon",
    });
  };

  return (
    <>
      <H4
        style={{
          marginBottom: "4px",
        }}
      >
        ข้อมูลส่วนตัว
      </H4>
      <UserDataContainer>
        <UserAvatarContainer>
          <UserAvatar user={user} size={128} fontSize={36} />
        </UserAvatarContainer>
        <UserDataContent>
          <H4
            style={{
              color: colorPrimary,
            }}
          >
            {user?.username ?? ""}
          </H4>
          <H5>แต้มสะสมทั้งหมด</H5>
          <ScoreContainer>
            <H3
              style={{
                color: colorPrimary,
                marginRight: "4px",
              }}
            >
              {user?.point ?? 0}
            </H3>
            <H5>แต้ม</H5>
          </ScoreContainer>
          <CouponButton onClick={() => onClickCouponButton()}>
            <Ticket size={16} color="#fff" />
            <H5
              style={{
                color: "#fff",
              }}
            >
              ดูคูปอง
            </H5>
          </CouponButton>
        </UserDataContent>
      </UserDataContainer>
    </>
  );
};

export default UserData;

const UserDataContainer = styled.div`
  width: 100%;
  padding: 12px;
  background-color: white;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  justify-content: space-evenly;
  margin-bottom: 28px;
`;

const UserAvatarContainer = styled.div`
  margin-right: 32px;
`;

const UserDataContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
`;

const CouponButton = styled(Button)`
  border-radius: 20px;
  border: 1px solid #a0d911;
  background-color: #a0d911;
  align-items: center;
  display: flex;
  gap: 8px;
`;
