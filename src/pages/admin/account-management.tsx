import AppLayout from "@/modules/AppLayout";
import EditPasswordContainer from "@/modules/admin/account/EditPassword";
import EditUsernameContainer from "@/modules/admin/account/EditUsername";
import { H1, H3, H4, H5 } from "@/modules/common/components/Typography";
import { useLogout } from "@/modules/common/hooks/useAuth";
import { useUser } from "@/modules/common/hooks/useUserStore";
import styled from "@emotion/styled";
import { Button, Collapse, type CollapseProps } from "antd";
import { useRouter } from "next/router";
import React from "react";

const AccountManagement = () => {
  const { data: user } = useUser();
  const router = useRouter();
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      void router.push("/signin");
    },
  });
  const [activeKeys, setActiveKeys] = React.useState<string[]>([]);
  const EditAccount: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <H5 bold style={{ marginLeft: "16px" }}>
          ชื่อผู้ใช้งาน
        </H5>
      ),
      children: (
        <EditUsernameContainer
          activeKeys={activeKeys}
          setActiveKeys={setActiveKeys}
        />
      ),
      extra: user?.username ?? "ชื่อผู้ใช้งาน",
    },
    {
      key: "2",
      label: (
        <H5 bold style={{ marginLeft: "16px" }}>
          รหัสผ่าน
        </H5>
      ),
      children: (
        <EditPasswordContainer
          activeKeys={activeKeys}
          setActiveKeys={setActiveKeys}
        />
      ),
      extra: "********",
    },
  ];

  return (
    <AppLayout layoutType="admin" currentPageId="accountManagement">
      <MainContainer>
        <SecondContainer>
          <EditContainer>
            <H3>จัดการบัญชีส่วนตัว</H3>
            <H4>ข้อมูลส่วนตัว</H4>
            <Collapse
              accordion
              onChange={(key) => {
                setActiveKeys(key as string[]);
              }}
              activeKey={activeKeys}
              defaultActiveKey={[]}
              items={EditAccount}
              collapsible="icon"
              expandIcon={() => <H1 style={{ color: "#1890FF" }}>แก้ไข</H1>}
              expandIconPosition="end"
            />
          </EditContainer>
          <Button
            type="text"
            danger
            style={{
              width: "fit-content",
              alignSelf: "center",
            }}
            onClick={() => logout()}
          >
            <u>ออกจากระบบ</u>
          </Button>
        </SecondContainer>
      </MainContainer>
    </AppLayout>
  );
};

export default AccountManagement;

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
