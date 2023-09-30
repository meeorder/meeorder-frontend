import AppLayout from "@/modules/AppLayout";
import EditPasswordContainer from "@/modules/admin/account/EditPassword";
import EditUsernameContainer from "@/modules/admin/account/EditUsername";
import { H1, H3, H4, H5 } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import styled from "@emotion/styled";
import { Collapse, type CollapseProps } from "antd";

const AccountManagemant = () => {
  const { data: user } = useUser();
  const EditAccount: CollapseProps["items"] = [
    {
      key: "1",
      label: <H5 bold>ชื่อผู้ใช้งาน</H5>,
      children: <EditUsernameContainer />,
      extra: user?.username ?? "ชื่อผู้ใช้งาน",
    },
    {
      key: "2",
      label: <H5 bold>รหัสผ่าน</H5>,
      children: <EditPasswordContainer />,
      extra: "********",
    },
  ];

  return (
    <AppLayout layoutType="admin" currentPageId="adminSetting">
      <MainContainer>
        <SecondContainer>
          <EditContainer>
            <H3>จัดการบัญชีส่วนตัว</H3>
            <H4>ข้อมูลส่วนตัว</H4>
            <Collapse
              accordion
              items={EditAccount}
              collapsible="icon"
              expandIcon={() => <H1 style={{ color: "#1890FF" }}>แก้ไข</H1>}
              expandIconPosition="end"
            />
          </EditContainer>
        </SecondContainer>
      </MainContainer>
    </AppLayout>
  );
};

export default AccountManagemant;

const MainContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 24px;
`;

const EditContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
