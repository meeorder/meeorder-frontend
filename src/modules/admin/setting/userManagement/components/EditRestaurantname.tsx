import useUpdateRestaurantSetting from "@/modules/admin/setting/userManagement/hooks/useUpdateResturantSetting";
import { H3, H5, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { Button, Form, Input, notification } from "antd";
import { type NotificationPlacement } from "antd/es/notification/interface";
import { type AxiosError } from "axios";
import React, { useEffect } from "react";

type FieldType = {
  restaurantName: string;
};

type Props = {
  setActiveKeys: (activeKeys: string[]) => void;
};

const EditRestaurantname: React.FC<Props> = ({ setActiveKeys }) => {
  const [form] = Form.useForm<FieldType>();
  const {
    mutate: editRestaurantName,
    isSuccess,
    isError,
    error,
  } = useUpdateRestaurantSetting({
    onSuccess: () => setActiveKeys([""]),
  });
  const [api, contextHolder] = notification.useNotification();

  const handleCancelForm = () => {
    form.resetFields();
    setActiveKeys([""]);
  };

  const handleEditRestaurantName = (values: FieldType) => {
    const { restaurantName: name } = values;
    editRestaurantName({
      name: name,
    });
  };

  useEffect(() => {
    if (isError) {
      const axiosErrorMessage =
        (
          error as AxiosError<{
            message: string;
          }>
        )?.response?.data?.message || " ";

      form.setFields([
        {
          name: "username",
          errors: [""],
        },
        {
          name: "password",
          errors: [axiosErrorMessage],
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
        <Text style={{ marginLeft: "4px" }}>แก้ไขชื่อร้านอาหารไม้สำเร็จ</Text>,
        <CheckCircle size={32} color="#A0D911" weight="fill" />,
      );
    }
    if (isError) {
      openNotification(
        "topRight",
        <H3 style={{ marginLeft: "4px" }}>ไม่สำเร็จ</H3>,
        <Text style={{ marginLeft: "4px" }}>แก้ไขชื่อร้านอาหารสำเร็จ</Text>,
        <XCircle size={32} color="#F5222D" weight="fill" />,
      );
    }
  }, [isSuccess, isError, api, setActiveKeys]);

  return (
    <>
      {contextHolder}
      <Container>
        <Form<FieldType> form={form} onFinish={handleEditRestaurantName}>
          <div>
            <H5 style={{ textAlign: "center" }}>เปลี่ยนชื่อร้านอาหาร</H5>
            <div style={{ textAlign: "center", width: "100%" }}>
              <Text type="secondary">
                ป้อนชื่อผู้ร้านอาหารใหม่และรหัสผ่านของคุณ
              </Text>
            </div>
          </div>
          <div>
            <Text>ชื่อร้านอาหาร</Text>
            <Form.Item<FieldType>
              name="restaurantName"
              rules={[{ required: true, message: "กรุณากรอกชื่อร้านอาหาร" }]}
            >
              <Input />
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

export default EditRestaurantname;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
