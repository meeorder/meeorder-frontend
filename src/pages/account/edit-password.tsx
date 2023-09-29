import { H4, H5, Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import BackButton from "@/modules/user/account/components/BackButton";
import { useUpdateUser } from "@/modules/user/account/hooks/useUpdateUser";
import styled from "@emotion/styled";
import { Button, Form, Input } from "antd";
import { type AxiosError } from "axios";
import Head from "next/head";
import { useEffect } from "react";

type FieldType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const EditPassword = () => {
  const [form] = Form.useForm<FieldType>();
  const { data: user } = useUser();
  const { mutate: editUsername, isSuccess, isError, error } = useUpdateUser();

  const handleEditPassword = (values: FieldType) => {
    const { oldPassword, newPassword } = values;
    editUsername({
      newUsername: user?.username || "",
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  };

  useEffect(() => {
    if (isError) {
      form.setFields([
        {
          name: "oldPassword",
          errors: [
            (
              error as AxiosError<{
                message: string;
              }>
            )?.response?.data?.message || " ",
          ],
        },
        {
          name: "newPassword",
          errors: [""],
        },
        {
          name: "confirmPassword",
          errors: [""],
        },
      ]);
    }
  }, [isError, form, error]);

  useEffect(() => {
    console.log(form.getFieldValue("newPassword"));
  }, [isSuccess, form]);

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
          <Form<FieldType> form={form} onFinish={handleEditPassword}>
            <ProfileContainer>
              <H4>แก้ไขรหัสผ่าน</H4>
              <Text type="secondary">ป้อนรหัสผ่านปัจจุบันและรหัสผ่านใหม่</Text>
              <FieldContainer>
                <Form.Item<FieldType>
                  name="oldPassword"
                  rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
                >
                  <H5
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    รหัสผ่านปัจจุบัน
                  </H5>
                  <Input.Password
                    style={{
                      marginBottom: "8px",
                      width: "100%",
                    }}
                    placeholder="example"
                  ></Input.Password>
                </Form.Item>
                <Form.Item<FieldType>
                  name="newPassword"
                  rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
                >
                  <H5
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    รหัสผ่านใหม่
                  </H5>
                  <Input.Password
                    style={{
                      marginBottom: "8px",
                      width: "100%",
                    }}
                    placeholder="example"
                  ></Input.Password>
                </Form.Item>
                <Form.Item<FieldType>
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกยืนยันรหัสผ่าน",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน"),
                        );
                      },
                    }),
                  ]}
                >
                  <H5
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    ยืนยันรหัสผ่านใหม่
                  </H5>
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
                <ChangePasswordButton htmlType="submit">
                  <Text style={{ color: "#fff" }}>เปลี่ยนรหัสผ่าน</Text>
                </ChangePasswordButton>
              </Form.Item>
            </ProfileContainer>
          </Form>
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

const FieldContainer = styled.div`
  width: 100%;
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
