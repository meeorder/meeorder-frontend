import AppLayout from "@/modules/AppLayout";
import EditRestaurantLogo from "@/modules/admin/setting/userManagement/components/EditRestaurantLogo";
import EditRestaurantname from "@/modules/admin/setting/userManagement/components/EditRestaurantname";
import { H3, H4, H5, Text } from "@/modules/common/components/Typography";
import { transientOptions } from "@/modules/common/transientOptions";
import styled from "@emotion/styled";
import { PencilSimpleLine } from "@phosphor-icons/react";
import { Button, Collapse, type CollapseProps } from "antd";
import { useState } from "react";

const AdminRestaurantAccountManagement = () => {
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
      children: <EditRestaurantname setActiveKeys={setActiveKeys} />,
      extra: "ชื่อร้านอาหาร",
    },
  ];

  return (
    <AppLayout
      layoutType="admin"
      currentPageId="adminRestaurantAccountManagement"
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
          <LogoForm>
            <Logo
              onClick={() => setIsOpenChangeLogo(true)}
              $isOpenChangeLogoForm={isOpenChangeLogo}
              // $imgUrl="https://lh3.googleusercontent.com/a/ACg8ocJnejw-DT5AVNfvMAnisSYhJh3nZbRV8rPDItgpoOZKGw"
            >
              {!isOpenChangeLogo && (
                <EditIcon onClick={() => setIsOpenChangeLogo(true)}>
                  <PencilSimpleLine size={24} color="white" />
                </EditIcon>
              )}
            </Logo>
            {isOpenChangeLogo && (
              <EditRestaurantLogo setIsOpenChangeLogo={setIsOpenChangeLogo} />
            )}
          </LogoForm>
        </EditLogoContainer>
        <EditRestauranttContainer>
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
        </EditRestauranttContainer>
      </MainContainer>
    </AppLayout>
  );
};

export default AdminRestaurantAccountManagement;

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

type LogoProps = {
  $isOpenChangeLogoForm: boolean;
  $imgUrl?: string;
};

const Logo = styled(Button, transientOptions)<LogoProps>`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 200px;
  background:
    url(${(props) => props.$imgUrl ?? "https://picsum.photos/200/306"}),
    lightgray 0px 0px / 100% 100% no-repeat;
  background-size: contain;

  &:hover {
    &:before {
      content: "CHANGE LOGO";
      display: ${(props) => (props.$isOpenChangeLogoForm ? "none" : "grid")};
      place-items: center;
      text-align: center;
      white-space: initial;
      font-size: 32px;
      color: ${(props) => props.theme.antd.colorBgBase};
      border-radius: 200px;
      width: 200px;
      height: 200px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: ${(props) => props.theme.antd.colorBgMask};
    }
  }
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

const LogoForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
`;

const EditRestauranttContainer = styled.div``;
