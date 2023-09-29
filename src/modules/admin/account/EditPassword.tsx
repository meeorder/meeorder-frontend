import { H5, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Button, Input } from "antd";

const EditPasswordContainer = () => {
  return (
    <>
      <Container>
        <div>
          <H5 style={{ textAlign: "center" }}>เปลี่ยนรหัสผ่าน</H5>
          <div style={{ textAlign: "center", width: "100%" }}>
            <Text type="secondary">ป้อนรหัสผ่านปัจจุบันและรหัสผ่านใหม่</Text>
          </div>
        </div>
        <div>
          <Text>รหัสผ่านปัจจุบัน</Text>
          <Input placeholder="รหัสผ่านปัจจุบัน" />
        </div>
        <div>
          <Text>รหัสผ่านใหม่</Text>
          <Input placeholder="รหัสผ่านใหม่" />
        </div>
        <div>
          <Text>ยืนยันรหัสผ่าน</Text>
          <Input placeholder="ยืนยันรหัสผ่าน" />
        </div>
        <ButtonContainer>
          <Button type="text">ยกเลิก</Button>
          <Button type="primary">เสร็จสิ้น</Button>
        </ButtonContainer>
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
