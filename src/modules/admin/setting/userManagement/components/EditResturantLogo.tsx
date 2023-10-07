import { H5, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Form, Input, notification } from "antd";
import React from "react";

type FieldType = {
  resturantImageLink: string;
};

type Props = {
  setIsOpenChangeLogo: (isOpenLogo: boolean) => void;
};

const EditResturantLogo: React.FC<Props> = ({ setIsOpenChangeLogo }) => {
  const [form] = Form.useForm<FieldType>();
  //   const {
  //     mutate: editResturantName,
  //     isSuccess,
  //     isError,
  //     error,
  //   } = useUpdateResturant({
  //     OnSuccess: () => UpdateActiveKeys(activeKeys, setActiveKeys),
  //   });
  const [api, contextHolder] = notification.useNotification();

  const handleCancelForm = () => {
    form.resetFields();
    setIsOpenChangeLogo(false);
  };

  const handleEditResturantName = (values: FieldType) => {
    const { resturantImageLink: name } = values;
    // editUsername({
    //   newUsername: username,
    //   oldPassword: password,
    // });

    // editResturantName({
    //   newName: name,
    // });
  };

  //   useEffect(() => {
  //     if (isError) {
  //       const axiosErrorMessage =
  //         (
  //           error as AxiosError<{
  //             message: string;
  //           }>
  //         )?.response?.data?.message || " ";

  //       form.setFields([
  //         {
  //           name: "username",
  //           errors: [""],
  //         },
  //         {
  //           name: "password",
  //           errors: [axiosErrorMessage],
  //         },
  //       ]);
  //     }
  //     if (isSuccess) {
  //       form.resetFields();
  //     }
  //   }, [isError, form, error, isSuccess]);

  //   useEffect(() => {
  //     const openNotification = (
  //       placement: NotificationPlacement,
  //       header: React.ReactNode,
  //       desciption: React.ReactNode,
  //       icon?: React.ReactNode,
  //       onClose?: () => void,
  //     ) => {
  //       api.destroy();
  //       api.info({
  //         message: header,
  //         placement,
  //         description: desciption,
  //         icon: icon,
  //         onClose: onClose,
  //       });
  //     };

  //     if (isSuccess) {
  //       openNotification(
  //         "topRight",
  //         <H3 style={{ marginLeft: "4px" }}>สำเร็จ</H3>,
  //         <Text style={{ marginLeft: "4px" }}>แก้ไขชื่อผู้ใช้สำเร็จ</Text>,
  //         <CheckCircle size={32} color="#A0D911" weight="fill" />,
  //       );
  //     }
  //     if (isError) {
  //       openNotification(
  //         "topRight",
  //         <H3 style={{ marginLeft: "4px" }}>ไม่สำเร็จ</H3>,
  //         <Text style={{ marginLeft: "4px" }}>แก้ไขชื่อผู้ใช้ไม่สำเร็จ</Text>,
  //         <XCircle size={32} color="#F5222D" weight="fill" />,
  //       );
  //     }
  //   }, [isSuccess, isError, api, router, setActiveKeys]);

  return (
    <>
      {contextHolder}
      <Container>
        <Form<FieldType> form={form} onFinish={handleEditResturantName}>
          <div>
            <H5 style={{ textAlign: "center" }}>เปลี่ยนโลโก้ร้านอาหาร</H5>
            <div style={{ textAlign: "center", width: "100%" }}>
              <Text type="secondary">
                ป้อนลิงก์โลโก้ร้านอาหารและรหัสผ่านใหม่
              </Text>
            </div>
          </div>
          <div>
            <Text>ลิงก์รูปภาพ</Text>
            <Form.Item<FieldType>
              name="resturantImageLink"
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

export default EditResturantLogo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.antd.colorBgLayout};
  background: #fafafa;
  padding: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
