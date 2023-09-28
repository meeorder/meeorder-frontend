import { H4, H5, Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import UserData from "@/modules/user/account/components/UserData";
import styled from "@emotion/styled";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Button } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

const Account = () => {
  const { data: user } = useUser();
  const router = useRouter();

  const onClickBackButton = () => {
    void router.back();
  };

  const onClickUsernameButton = () => {
    void router.push({
      pathname: "/account/edit-username",
    });
  };

  const onClickPasswordButton = () => {
    void router.push({
      pathname: "/account/edit-password",
    });
  };

  return (
    <>
      <Head>
        <title>MeeOrder | PersonalAccount</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScreenContainer>
        <Container>
          <BackButtonContainer onClick={() => onClickBackButton()}>
            <CaretLeft size={32} />
            <Text>กลับสู่หน้าหลัก</Text>
          </BackButtonContainer>
          <UserData />
          <ProfileContainer>
            <H4>ตั้งค่าโพรไฟล์</H4>
            <UsernameAndPasswordContainer onClick={onClickUsernameButton}>
              <H5 bold>ชื่อผู้ใช้</H5>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Text>{user?.username ?? ""}</Text>
                <CaretRight size={16} />
              </span>
            </UsernameAndPasswordContainer>
            <UsernameAndPasswordContainer onClick={onClickPasswordButton}>
              <H5 bold>รหัสผ่าน</H5>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Text>*********</Text>
                <CaretRight size={16} />
              </span>
            </UsernameAndPasswordContainer>
          </ProfileContainer>
        </Container>
      </ScreenContainer>
    </>
  );
};

export default Account;

const ScreenContainer = styled.div`
  min-height: 100dvh;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fafafa;
`;

const Container = styled.div`
  min-height: 100dvh;
  height: 100%;
  width: 100%;
  padding-top: 16px;
  padding-inline: 20px;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 72.33%,
      ${(props) => props.theme.antd.colorPrimaryBorder} 115.11%
    ),
    linear-gradient(
      180deg,
      ${(props) => props.theme.antd.colorPrimaryBorder} -27.67%,
      #fff 25.01%
    );
`;

const BackButtonContainer = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;
  min-width: 136px;
  margin-bottom: 12px;
  border: none;
  box-shadow: none;
  background: none;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const UsernameAndPasswordContainer = styled(Button)`
  width: 100%;
  padding-inline: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: none;
  box-shadow: none;
`;
