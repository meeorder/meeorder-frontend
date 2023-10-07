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
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  activeKeys: string[];
  setActiveKeys: (activeKeys: string[]) => void;
};

const EditPasswordContainer: React.FC<Props> = ({ setActiveKeys }) => {
  const [form] = Form.useForm<FieldType>();
  const router = useRouter();
  const {
    mutate: editUsername,
    isSuccess,
    isError,
    error,
  } = useUpdateUser({
    OnSuccess: () => setActiveKeys([""]),
  });
  const [api, contextHolder] = notification.useNotification();

  const handleCancelForm = () => {
    form.resetFields();
    setActiveKeys([""]);
  };

  const handleEditPassword = (values: FieldType) => {
    const { oldPassword, newPassword } = values;
    editUsername({
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
    if (isSuccess) {
      form.resetFields();
    }
  }, [isError, form, error, isSuccess]);

  useEffect(() => {
    const openNotification = (
      placement: NotificationPlacement,
      header: React.ReactNode,
      description: React.ReactNode,
      icon?: React.ReactNode,
      onClose?: () => void,
    ) => {
      api.destroy();
      api.info({
        message: header,
        placement,
        description: description,
        icon: icon,
        onClose: onClose,
      });
    };

    if (isSuccess) {
      openNotification(
        "topRight",
        <H3 style={{ marginLeft: "4px" }}>สำเร็จ</H3>,
        <Text style={{ marginLeft: "4px" }}>แก้ไขรหัสผ่านสำเร็จ</Text>,
        <CheckCircle size={32} color="#A0D911" weight="fill" />,
      );
    }
    if (isError) {
      openNotification(
        "topRight",
        <H3 style={{ marginLeft: "4px" }}>ไม่สำเร็จ</H3>,
        <Text style={{ marginLeft: "4px" }}>แก้ไขรหัสผ่านไม่สำเร็จ</Text>,
        <XCircle size={32} color="#F5222D" weight="fill" />,
      );
    }
  }, [isSuccess, isError, api, router]);

  return (
    <>
      {contextHolder}
      <Container>
        <Form<FieldType> form={form} onFinish={handleEditPassword}>
          <div>
            <H5 style={{ textAlign: "center" }}>เปลี่ยนรหัสผ่าน</H5>
            <div style={{ textAlign: "center", width: "100%" }}>
              <Text type="secondary">ป้อนรหัสผ่านปัจจุบันและรหัสผ่านใหม่</Text>
            </div>
          </div>
          <div>
            <Text>รหัสผ่านปัจจุบัน</Text>
            <Form.Item<FieldType>
              name="oldPassword"
              rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div>
            <Text>รหัสผ่านใหม่</Text>
            <Form.Item<FieldType>
              name="newPassword"
              rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div>
            <Text>ยืนยันรหัสผ่านใหม่</Text>
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
              <Input.Password />
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

export default EditPasswordContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;
