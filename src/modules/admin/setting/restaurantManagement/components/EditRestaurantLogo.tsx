import useUpdateRestaurantSetting from "@/modules/admin/setting/restaurantManagement/hooks/useUpdateResturantSetting";
import { H3, H5, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { Button, Form, Input } from "antd";
import {
  type NotificationInstance,
  type NotificationPlacement,
} from "antd/es/notification/interface";
import { type AxiosError } from "axios";
import React, { useEffect } from "react";

type FieldType = {
  restaurantImageLink: string;
};

type Props = {
  restaurantLogo: string;
  setIsOpenChangeLogo: (isOpenLogo: boolean) => void;
  api: NotificationInstance;
};

const EditRestaurantLogo: React.FC<Props> = ({
  setIsOpenChangeLogo,
  restaurantLogo,
  api,
}) => {
  const [form] = Form.useForm<FieldType>();
  const {
    mutate: editRestaurantLogo,
    isSuccess,
    isError,
    error,
  } = useUpdateRestaurantSetting({
    onSuccess: () => {
      setTimeout(() => {
        setIsOpenChangeLogo(false);
      }, 100);
    },
  });

  const handleCancelForm = () => {
    form.resetFields();
    setIsOpenChangeLogo(false);
  };

  const handleEditRestaurantName = (values: FieldType) => {
    const { restaurantImageLink: imageLink } = values;

    editRestaurantLogo({
      logo: imageLink,
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
          name: "restaurantImageLink",
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
        <Text style={{ marginLeft: "4px" }}>แก้ไขโลโก้ร้านอาหารสำเร็จ</Text>,
        <CheckCircle size={32} color="#A0D911" weight="fill" />,
      );
    }
    if (isError) {
      openNotification(
        "topRight",
        <H3 style={{ marginLeft: "4px" }}>ไม่สำเร็จ</H3>,
        <Text style={{ marginLeft: "4px" }}>แก้ไขโลโก้ร้านอาหารไม่สำเร็จ</Text>,
        <XCircle size={32} color="#F5222D" weight="fill" />,
      );
    }
  }, [isSuccess, isError, api]);

  return (
    <>
      <Container>
        <Form<FieldType>
          form={form}
          onFinish={handleEditRestaurantName}
          initialValues={{ restaurantImageLink: restaurantLogo }}
        >
          <div>
            <H5 style={{ textAlign: "center" }}>เปลี่ยนโลโก้ร้านอาหาร</H5>
            <div style={{ textAlign: "center", width: "100%" }}>
              <Text type="secondary">ป้อนลิงก์โลโก้ร้านอาหาร</Text>
            </div>
          </div>
          <div>
            <Text>ลิงก์รูปภาพ</Text>
            <Form.Item<FieldType>
              name="restaurantImageLink"
              rules={[{ required: true, message: "ลิงก์รูปภาพ" }]}
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

export default EditRestaurantLogo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 200px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.antd.colorBgLayout};
  background: #fafafa;
  padding: 12px;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
