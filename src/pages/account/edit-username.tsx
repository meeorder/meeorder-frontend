import { H4, H5, Text } from "@/modules/common/components/Typography";
import BackButton from "@/modules/user/account/components/BackButton";
import { useUpdateUser } from "@/modules/user/account/hooks/useUpdateUser";
import styled from "@emotion/styled";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { Button, Form, Input, notification } from "antd";
import { type NotificationPlacement } from "antd/es/notification/interface";
import { type AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

type FieldType = {
  username: string;
  password: string;
};

const EditUsername = () => {
  const [form] = Form.useForm<FieldType>();
  const { mutate: editUsername, isSuccess, isError, error } = useUpdateUser();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const handleEditUsername = (values: FieldType) => {
    const { username, password } = values;
    editUsername({
      newUsername: username,
      oldPassword: password,
    });
  };

  useEffect(() => {
    if (isError) {
      const axiosErrorMessage =
        (
          error as AxiosError<{
            message: string;
          }>
        )?.response?.data?.message[0] || " ";

      form.setFields([
        {
          name: "username",
          errors: [""],
        },
        {
          name: "password",
          errors: [
            axiosErrorMessage ===
            "newUsername must be longer than or equal to 4 characters"
              ? "ชื่อผู้ใช้ต้องมีความยาวมากกว่าหรือเท่ากับ 4 ตัวอักษร"
              : axiosErrorMessage,
          ],
        },
      ]);
    }
    if (isSuccess) {
      form.resetFields();
    }
  }, [isError, form, error, isSuccess]);

  useEffect(() => {
    const openNotification = (
      placement: NotificationPlacement,
      header: React.ReactNode,
      description?: string,
      icon?: React.ReactNode,
      onClose?: () => void,
    ) => {
      api.destroy();
      api.info({
        message: header,
        description: description ?? "",
        placement,
        icon: icon,
        onClose: onClose,
      });
    };

    if (isSuccess) {
      openNotification(
        "top",
        <H5>แก้ไขชื่อผู้ใช้สำเร็จ</H5>,
        "กดปิดเพื่อกลับไปหน้าโพรไฟล์",
        <CheckCircle size={24} color="#A0D911" weight="fill" />,
        () => void router.push("/account"),
      );
    }
    if (isError) {
      openNotification(
        "top",
        <H5>แก้ไขชื่อผู้ใช้ไม่สำเร็จ</H5>,
        "",
        <XCircle size={24} color="#F5222D" weight="fill" />,
      );
    }
  }, [isSuccess, isError, api, router]);

  return (
    <>
      <Head>
        <title>MeeOrder | EditUsername</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScreenContainer>
        {contextHolder}
        <Container>
          <BackButton text={"กลับสู่หน้าโพรไฟล์"} />
          <Form<FieldType> form={form} onFinish={handleEditUsername}>
            <ProfileContainer>
              <H4>แก้ไขชื่อผู้ใช้</H4>
              <Text type="secondary">ป้อนชื่อผู้ใช้ใหม่และรหัสผ่านของคุณ</Text>
              <FieldContainer>
                <H5
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  ชื่อผู้ใช้
                </H5>
                <Form.Item<FieldType>
                  name="username"
                  rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
                >
                  <Input
                    style={{
                      marginBottom: "8px",
                      width: "100%",
                    }}
                    placeholder="example"
                  ></Input>
                </Form.Item>
                <H5
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  รหัสผ่านปัจจุบัน
                </H5>
                <Form.Item<FieldType>
                  name="password"
                  rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
                >
                  <Input.Password
                    style={{
                      marginBottom: "8px",
                      width: "100%",
                    }}
                    placeholder="example"
                  ></Input.Password>
                </Form.Item>
              </FieldContainer>
              <Form.Item<FieldType> style={{ textAlign: "end" }}>
                <ChangeUsernameButton htmlType="submit">
                  <Text style={{ color: "#fff" }}>เปลี่ยนชื่อผู้ใช้</Text>
                </ChangeUsernameButton>
              </Form.Item>
            </ProfileContainer>
          </Form>
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

const FieldContainer = styled.div`
  width: 100%;
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
