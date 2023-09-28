import { H4, H5, Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import BackButton from "@/modules/user/account/components/BackButton";
import styled from "@emotion/styled";
import { Button, Input } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

const EditUsername = () => {
  const { data: user } = useUser();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MeeOrder | EditUsername</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScreenContainer>
        <Container>
          <BackButton text={"กลับสู่หน้าโพรไฟล์"} />
          <ProfileContainer>
            <H4>แก้ไขชื่อผู้ใช้</H4>
            <Text type="secondary">ป้อนชื่อผู้ใช้ใหม่และรหัสผ่านของคุณ</Text>
            <FieldContainer>
              <UsernameContainer>
                <H5
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  ชื่อผู้ใช้
                </H5>
                <Input
                  style={{
                    marginBottom: "8px",
                    width: "100%",
                  }}
                  placeholder="example"
                ></Input>
              </UsernameContainer>
              <PasswordContainer>
                <H5
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  รหัสผ่านปัจจุบัน
                </H5>
                <Input
                  style={{
                    marginBottom: "8px",
                    width: "100%",
                  }}
                  placeholder="example"
                ></Input>
              </PasswordContainer>
            </FieldContainer>
            <ChangeUsernameButton>
              <Text style={{ color: "#fff" }}>เปลี่ยนชื่อผู้ใช้</Text>
            </ChangeUsernameButton>
          </ProfileContainer>
        </Container>
      </ScreenContainer>
    </>
  );
};

export default EditUsername;

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
      #fff 18.01%
    );
`;

const ProfileContainer = styled.div`
  display: flex;
  padding: 8px 0px;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background: #fff;
`;

const UsernameContainer = styled.div`
  margin-bottom: 12px;
  width: 100%;
`;

const PasswordContainer = styled.div`
  margin-bottom: 12px;
  width: 100%;
`;

const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
`;

const ChangeUsernameButton = styled(Button)`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: ${(props) => props.theme.antd.colorPrimary};
  border-radius: 1px solid ${(props) => props.theme.antd.colorPrimary};
`;
