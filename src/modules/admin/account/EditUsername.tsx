import { H3, H5, Text } from "@/modules/common/components/Typography";
import { useUpdateUser } from "@/modules/user/account/hooks/useUpdateUser";
import styled from "@emotion/styled";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { Button, Form, Input, notification } from "antd";
import { type NotificationPlacement } from "antd/es/notification/interface";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type FieldType = {
  username: string;
  password: string;
};

type Props = {
  activeKeys: string[];
  setActiveKeys: (activeKeys: string[]) => void;
};

const EditUsernameContainer: React.FC<Props> = ({
  activeKeys,
  setActiveKeys,
}) => {
  const [form] = Form.useForm<FieldType>();
  const { mutate: editUsername, isSuccess, isError, error } = useUpdateUser();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const handleCancelForm = () => {
    form.resetFields();
    const newActiveKeys = activeKeys.filter((key) => key !== "1");
    setActiveKeys(newActiveKeys);
  };

  const handleEditUsername = (values: FieldType) => {
    console.log(values);
    const { username, password } = values;
    editUsername({
      newUsername: username,
      oldPassword: password,
      newPassword: password,
    });
  };

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
    if (isSuccess) {
      form.resetFields();
      const newActiveKeys = activeKeys.filter((key) => key !== "1");
      setActiveKeys(newActiveKeys);
    }
  }, [isError, form, error, isSuccess, setActiveKeys]);

  useEffect(() => {
    const openNotification = (
      placement: NotificationPlacement,
      header: React.ReactNode,
      desciption: React.ReactNode,
      icon?: React.ReactNode,
      onClose?: () => void,
    ) => {
      api.destroy();
      api.info({
        message: header,
        placement,
        description: desciption,
        icon: icon,
        onClose: onClose,
      });
    };

    if (isSuccess) {
      openNotification(
        "topRight",
        <H3 style={{ marginLeft: "4px" }}>สำเร็จ</H3>,
        <Text style={{ marginLeft: "4px" }}>แก้ไขชื่อผู้ใช้สำเร็จ</Text>,
        <CheckCircle size={32} color="#A0D911" weight="fill" />,
      );
    }
    if (isError) {
      openNotification(
        "topRight",
        <H3 style={{ marginLeft: "4px" }}>ไม่สำเร็จ</H3>,
        <Text style={{ marginLeft: "4px" }}>แก้ไขชื่อผู้ใช้ไม่สำเร็จ</Text>,
        <XCircle size={32} color="#F5222D" weight="fill" />,
      );
    }
  }, [isSuccess, isError, api, router, setActiveKeys]);

  return (
    <>
      {contextHolder}
      <Container>
        <Form<FieldType> form={form} onFinish={handleEditUsername}>
          <div>
            <H5 style={{ textAlign: "center" }}>เปลี่ยนชื่อผู้ใช้</H5>
            <div style={{ textAlign: "center", width: "100%" }}>
              <Text type="secondary">ป้อนชื่อผู้ใช้ใหม่และรหัสผ่านของคุณ</Text>
            </div>
          </div>
          <div>
            <Text>ชื่อผู้ใช้</Text>
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
            >
              <Input placeholder="ชื่อผู้ใช้" />
            </Form.Item>
          </div>
          <div>
            <Text>รหัสผ่านปัจจุบัน</Text>
            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
            >
              <Input.Password placeholder="รหัสผ่านปัจจุบัน" />
            </Form.Item>
          </div>
          <ButtonContainer>
            <Button onClick={handleCancelForm} type="text">
              ยกเลิก
            </Button>
            <Form.Item<FieldType>>
              <Button htmlType="submit" type="primary">
                เสร็จสิ้น
              </Button>
            </Form.Item>
          </ButtonContainer>
        </Form>
      </Container>
    </>
  );
};

export default EditUsernameContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
