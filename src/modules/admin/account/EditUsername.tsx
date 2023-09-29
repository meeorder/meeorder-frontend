import { H5, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Input } from "antd";

const EditUsernameContainer = () => {
  return (
    <>
      <Container>
        <div>
          <H5 style={{ textAlign: "center" }}>เปลี่ยนชื่อผู้ใช้</H5>
          <div style={{ textAlign: "center", width: "100%" }}>
            <Text type="secondary">ป้อนชื่อผู้ใช้ใหม่และรหัสผ่านของคุณ</Text>
          </div>
        </div>
        <div>
          <Text>ชื่อผู้ใช้</Text>
          <Input placeholder="ชื่อผู้ใช้" />
        </div>
        <div>
          <Text>รหัสผ่าน</Text>
          <Input placeholder="รหัสผ่าน" />
        </div>
        <ButtonContainer>
          <Button type="text">ยกเลิก</Button>
          <Button type="primary">เสร็จสิ้น</Button>
        </ButtonContainer>
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
  margin-top: 12px;
`;
