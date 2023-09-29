import { H2, H5 } from "@/modules/common/components/Typography";
import { useLogin } from "@/modules/common/hooks/useAuth";
import styled from "@emotion/styled";
import { LockSimple, User } from "@phosphor-icons/react";
import { Button, Form, Input, theme } from "antd";
import { type AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

type FieldType = {
  username: string;
  password: string;
};

const SignIn = () => {
  const [form] = Form.useForm<FieldType>();
  const router = useRouter();
  const { mutate: login, isLoading, isSuccess, isError, error } = useLogin();
  const handleSignIn = (values: FieldType) => {
    login(values);
  };
  const {
    token: { colorPrimary, colorBorder },
  } = theme.useToken();

  useEffect(() => {
    if (isError) {
      form.setFields([
        {
          name: "username",
          errors: [""],
        },
        {
          name: "password",
          errors: [
            (
              error as AxiosError<{
                message: string;
              }>
            )?.response?.data?.message || " ",
          ],
        },
      ]);
    }
  }, [isError, form, error]);

  useEffect(() => {
    if (isSuccess) {
      void router.push("/");
    }
  }, [isSuccess, router]);
  return (
    <Container>
      <FormContainer>
        <Image
          style={{
            marginBottom: "52px",
          }}
          src="/image/logo.png"
          width={200}
          height={100}
          alt="logo"
        />
        <div
          style={{
            alignSelf: "flex-start",
            paddingInline: "12px",
            marginBottom: "24px",
          }}
        >
          <H2>ยินดีต้อนรับ!</H2>
          <H5 type="secondary">เข้าสู่ระบบเพื่อสะสมแต้มและรับสิทธิพิเศษ!</H5>
        </div>
        <Form<FieldType>
          form={form}
          onFinish={handleSignIn}
          style={{ width: "100%" }}
        >
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
          >
            <Input
              prefix={<User size={14} color={colorBorder} />}
              placeholder="ชื่อผู้ใช้"
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
          >
            <Input.Password
              prefix={<LockSimple size={14} color={colorBorder} />}
              placeholder="รหัสผ่าน"
            />
          </Form.Item>
          <Form.Item<FieldType> style={{ textAlign: "end" }}>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              ลงชื่อเข้าใช้
            </Button>
            หรือ{" "}
            <Link href="/register" style={{ color: colorPrimary }}>
              ลงทะเบียน
            </Link>{" "}
            เลย!
          </Form.Item>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default SignIn;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
`;
const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
