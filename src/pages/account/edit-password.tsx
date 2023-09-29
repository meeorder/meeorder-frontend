import { H4, H5, Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import BackButton from "@/modules/user/account/components/BackButton";
import styled from "@emotion/styled";
import { Button, Input } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const EditPassword = () => {
  const { data: user } = useUser();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            <H4>แก้ไขรหัสผ่าน</H4>
            <Text type="secondary">ป้อนรหัสผ่านปัจจุบันและรหัสผ่านใหม่</Text>
            <FieldContainer>
              <UsernameContainer>
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></Input>
              </UsernameContainer>
              <PasswordContainer>
                <H5
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  รหัสผ่านใหม่
                </H5>
                <Input
                  style={{
                    marginBottom: "8px",
                    width: "100%",
                  }}
                  placeholder="example"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                ></Input>
              </PasswordContainer>
              <PasswordContainer>
                <H5
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  ยืนยันรหัสผ่านใหม่
                </H5>
                <Input
                  style={{
                    marginBottom: "8px",
                    width: "100%",
                  }}
                  placeholder="example"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                ></Input>
              </PasswordContainer>
            </FieldContainer>
            <ChangePasswordButton
              onClick={() => {
                console.log(password, newPassword, confirmPassword);
              }}
            >
              <Text style={{ color: "#fff" }}>เปลี่ยนรหัสผ่าน</Text>
            </ChangePasswordButton>
          </ProfileContainer>
        </Container>
      </ScreenContainer>
    </>
  );
};

export default EditPassword;

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

const ChangePasswordButton = styled(Button)`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: ${(props) => props.theme.antd.colorPrimary};
  border-radius: 1px solid ${(props) => props.theme.antd.colorPrimary};
`;
