import AppLayout from "@/modules/AppLayout";
import EditPasswordContainer from "@/modules/admin/account/EditPassword";
import EditUsernameContainer from "@/modules/admin/account/EditUsername";
import { H1, H3, H4 } from "@/modules/common/components/Typography";
import { useUser } from "@/modules/common/hooks/useUserStore";
import styled from "@emotion/styled";
import { Collapse, type CollapseProps } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const AccountManagemant = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>(["1", "2"]);
  const { data: user } = useUser();
  const router = useRouter();
  const EditAccount: CollapseProps["items"] = [
    {
      key: "1",
      label: "ชื่อผู้ใช้งาน",
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
      label: "รหัสผ่าน",
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
    <AppLayout layoutType="admin" currentPageId="adminSetting">
      <MainContainer>
        <SecondContainer>
          <EditContainer>
            <H3>จัดการบัญชีส่วนตัว</H3>
            <H4>ข้อมูลส่วนตัว</H4>
            <Collapse
              items={EditAccount}
              activeKey={activeKeys}
              defaultActiveKey={[]}
              collapsible="icon"
              expandIcon={() => (
                <H1
                  style={{ color: "#1890FF" }}
                  onClick={(e) => {
                    setActiveKeys(
                      e.currentTarget.id
                        .split(",")
                        .filter((key) => key !== "1"),
                    );
                  }}
                >
                  แก้ไข
                </H1>
              )}
              expandIconPosition="start"
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
