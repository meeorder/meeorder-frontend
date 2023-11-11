import AppLayout from "@/modules/AppLayout";
import EditRestaurantLogo from "@/modules/admin/setting/restaurantManagement/components/EditRestaurantLogo";
import EditRestaurantName from "@/modules/admin/setting/restaurantManagement/components/EditRestaurantName";
import useRestaurantSetting from "@/modules/admin/setting/restaurantManagement/hooks/useRestaurantSetting";
import { H3, H4, H5, Text } from "@/modules/common/components/Typography";
import { transientOptions } from "@/modules/common/transientOptions";
import styled from "@emotion/styled";
import { PencilSimpleLine } from "@phosphor-icons/react";
import { Button, Collapse, notification, type CollapseProps } from "antd";
import { useState } from "react";

const AdminRestaurantAccountManagement = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isOpenChangeLogo, setIsOpenChangeLogo] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const { data } = useRestaurantSetting();
  const restaurantName = data?.name ?? "ชื่อร้านอาหาร";
  const restaurantLogo = data?.logo ?? "https://picsum.photos/200/306";

  const EditName: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <H5 bold style={{ marginLeft: "16px" }}>
          ชื่อร้านอาหาร
        </H5>
      ),
      children: (
        <EditRestaurantName
          key={activeKeys.toString() + "restaurantName"}
          setActiveKeys={setActiveKeys}
          restaurantName={restaurantName}
        />
      ),
      extra: `${restaurantName}`,
    },
  ];

  return (
    <AppLayout
      layoutType="admin"
      currentPageId="adminRestaurantAccountManagement"
    >
      {contextHolder}
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
          <LogoForm key={activeKeys.toString() + "restaurantLogo"}>
            <Logo
              ghost
              onClick={() => setIsOpenChangeLogo(true)}
              $isOpenChangeLogoForm={isOpenChangeLogo}
              $imgUrl={restaurantLogo}
              style={{
                backgroundImage: `url(${
                  restaurantLogo ?? "https://picsum.photos/200/306"
                })`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {!isOpenChangeLogo && (
                <EditIcon onClick={() => setIsOpenChangeLogo(true)}>
                  <PencilSimpleLine size={24} color="white" />
                </EditIcon>
              )}
            </Logo>
            {isOpenChangeLogo && (
              <EditRestaurantLogo
                setIsOpenChangeLogo={setIsOpenChangeLogo}
                restaurantLogo={restaurantLogo}
                api={api}
              />
            )}
          </LogoForm>
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
  border-radius: 4px;

  &:hover {
    &:before {
      content: "แก้ไข โลโก้";
      display: ${(props) => (props.$isOpenChangeLogoForm ? "none" : "grid")};
      place-items: center;
      text-align: center;
      white-space: initial;
      font-size: 48px;
      color: ${(props) => props.theme.antd.colorBgBase};
      width: 200px;
      height: 200px;
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: ${(props) => props.theme.antd.colorBgMask};
    }
  }
`;

const EditIcon = styled.div`
  position: absolute;
  top: 170px;
  left: 170px;

  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 300px;
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

const EditRestaurantContainer = styled.div``;
