import { H2, H5 } from "@/modules/common/components/Typography";
import { useRegister } from "@/modules/common/hooks/useAuth";
import styled from "@emotion/styled";
import { LockSimple, User } from "@phosphor-icons/react";
import { Button, Form, Input, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

type FieldType = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [form] = Form.useForm<FieldType>();
  const { mutate: register, isLoading, isSuccess, isError } = useRegister();
  const handleRegister = (values: FieldType) => {
    register(values);
  };
  const {
    token: { colorPrimary, colorBorder },
  } = theme.useToken();
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      void router.push({
        href: "/signin",
      });
    }
  }, [isSuccess, router]);
  useEffect(() => {
    if (isError) {
      form.setFields([
        {
          name: "username",
          errors: ["ไม่สามารถใช้ชื่อผู้ใช้นี้ได้"],
        },
      ]);
    }
  }, [isError, form]);
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
          <H5 type="secondary">สมัครสมาชิกแล้วเริ่มเก็บแต้มของคุณเลย!</H5>
        </div>
        <Form onFinish={handleRegister} style={{ width: "100%" }}>
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
          <Form.Item<FieldType>
            hasFeedback
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "กรุณายืนยันรหัสผ่าน" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockSimple size={14} color={colorBorder} />}
              placeholder="ยืนยันรหัสผ่าน"
            />
          </Form.Item>
          <Form.Item<FieldType> style={{ textAlign: "end" }}>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              ลงทะเบียน
            </Button>
            หรือ{" "}
            <Link href="/signin" style={{ color: colorPrimary }}>
              ลงชื่อเข้าใช้
            </Link>{" "}
            เลย!
          </Form.Item>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Register;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
`;
const Container = styled.div`
  height: 100vh;
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
