import AppLayout from "@/modules/AppLayout";
import EditResturantLogo from "@/modules/admin/setting/userManagement/components/EditResturantLogo";
import EditResturantname from "@/modules/admin/setting/userManagement/components/EditResturantname";
import { H3, H4, H5, Text } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { PencilSimpleLine } from "@phosphor-icons/react";
import { Collapse, type CollapseProps } from "antd";
import { useState } from "react";

const AdminResturantAccountManagement = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isOpenChangeLogo, setIsOpenChangeLogo] = useState(false);

  const EditName: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <H5 bold style={{ marginLeft: "16px" }}>
          ชื่อร้านอาหาร
        </H5>
      ),
      children: <EditResturantname setActiveKeys={setActiveKeys} />,
      //   extra: user?.username ?? "ชื่อผู้ใช้งาน",
      extra: "ชื่อร้านอาหาร",
    },
  ];

  return (
    <AppLayout
      layoutType="admin"
      currentPageId="adminResturantAccountManagement"
    >
      <MainContainer>
        <H3>จัดการโลโก้และร้านอาหาร</H3>
        <EditLogoContainer>
          <H4
            style={{
              marginBottom: "16px",
            }}
          >
            โลโก้ร้านอาหาร
          </H4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Logo>
              {!isOpenChangeLogo && (
                <EditIcon onClick={() => setIsOpenChangeLogo(true)}>
                  <PencilSimpleLine size={24} color="white" />
                </EditIcon>
              )}
            </Logo>
            {isOpenChangeLogo && (
              <EditResturantLogo setIsOpenChangeLogo={setIsOpenChangeLogo} />
            )}
          </div>
        </EditLogoContainer>
        <EditRestaurantContainer>
          <H4
            style={{
              marginBottom: "16px",
            }}
          >
            ข้อมูลร้านอาหาร
          </H4>
          <Collapse
            accordion
            items={EditName}
            onChange={(key) => {
              setActiveKeys(key as string[]);
            }}
            activeKey={activeKeys}
            collapsible="icon"
            expandIcon={() => <Text style={{ color: "#1890FF" }}>แก้ไข</Text>}
            expandIconPosition="end"
          />
        </EditRestaurantContainer>
      </MainContainer>
    </AppLayout>
  );
};

export default AdminResturantAccountManagement;

const MainContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 24px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
`;

const EditLogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Logo = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 200px;
  background:
    url(https://picsum.photos/200/306),
    lightgray 0px 0px / 100% 100% no-repeat;
  background-size: contain;
`;

const EditIcon = styled.div`
  position: absolute;
  top: 150px;
  left: 150px;

  padding: 8px;
  border-radius: 100px;
  border: 1px solid ${(props) => props.theme.antd.colorLink};
  background: ${(props) => props.theme.antd.colorLink};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
`;

const EditRestaurantContainer = styled.div``;
