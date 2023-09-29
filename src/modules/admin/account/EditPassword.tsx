import { H5, Text } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { useUpdateUser } from "@/modules/user/account/hooks/useUpdateUser";
import styled from "@emotion/styled";
import { Button, Form, Input } from "antd";
import { type AxiosError } from "axios";
import { useEffect } from "react";

type FieldType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  activeKeys: string[];
  setActiveKeys: (activeKeys: string[]) => void;
};

const EditPasswordContainer: React.FC<Props> = ({
  activeKeys,
  setActiveKeys,
}) => {
  const [form] = Form.useForm<FieldType>();
  const { data: user } = useUser();
  const { mutate: editUsername, isSuccess, isError, error } = useUpdateUser();

  const handleCancelForm = () => {
    form.resetFields();
    const newActiveKeys = activeKeys.filter((key) => key !== "2");
    setActiveKeys(newActiveKeys);
  };

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
              <Input.Password placeholder="รหัสผ่านปัจจุบัน" />
            </Form.Item>
          </div>
          <div>
            <Text>รหัสผ่านใหม่</Text>
            <Form.Item<FieldType>
              name="newPassword"
              rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
            >
              <Input.Password placeholder="รหัสผ่านใหม่" />
            </Form.Item>
          </div>
          <div>
            <Text>ยืนยันรหัสผ่าน</Text>
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
              <Input.Password placeholder="ยืนยันรหัสผ่าน" />
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
