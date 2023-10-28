import useRestaurantSetting from "@/modules/admin/setting/restaurantManagement/hooks/useRestaurantSetting";
import { H2, H5 } from "@/modules/common/components/Typography";
import { useLogin } from "@/modules/common/hooks/useAuth";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { pages } from "@/modules/pageConfig";
import { roleToRoleNumber } from "@/modules/services/users";
import styled from "@emotion/styled";
import { LockSimple, User } from "@phosphor-icons/react";
import { Button, Form, Input, theme } from "antd";
import { type AxiosError } from "axios";
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
  const { data: user } = useUser();
  const { data: restaurant } = useRestaurantSetting();

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
    if (user?.role === roleToRoleNumber["Customer"]) {
      void router.push(pages.home.path);
    } else if (user?.role === roleToRoleNumber["Employee"]) {
      void router.push(pages.employeeOrderManagement.path);
    } else if (user?.role === roleToRoleNumber["Cashier"]) {
      void router.push(pages.cashierTableManagement.path);
    } else if (user?.role === roleToRoleNumber["Owner"]) {
      void router.push(pages.adminDashboard.path);
    }
  }, [isSuccess, router, user]);
  return (
    <Container>
      <FormContainer>
        <Logo
          style={{
            backgroundImage: `url(${
              restaurant?.logo ?? "https://picsum.photos/200/306"
            })`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            marginBottom: "24px",
          }}
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

const Logo = styled.div`
  height: 128px;
  width: 128px;
  border-radius: 4px;
`;
