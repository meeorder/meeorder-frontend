import MenuList from "@/modules/admin/menu/MenuList";
import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import { H3, H5 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Plus } from "@phosphor-icons/react";
import { Button, Card, Switch } from "antd";

type MenuSectionProps = {
  menuSectionMode: MenuSectionMode;
  setMenuSectionMode: (value: MenuSectionMode) => void;
};

const MenuSection: React.FC<MenuSectionProps> = ({
  menuSectionMode,
  setMenuSectionMode,
}) => {
  const { changeToAddMenuMode } = useConsoleSectionMode();
  return (
    <MenuSectionCard
      title={
        <H3>
          {menuSectionMode === "preview" ? "เมนูตัวอย่าง" : "เมนูทั้งหมด"}
        </H3>
      }
      extra={
        <CardTitleExtra>
          <SwitchContainer>
            <H5>แสดงตัวอย่าง</H5>
            <Switch
              title="ปรับเปลี่ยนโหมดแสดงตัวอย่าง"
              checked={menuSectionMode === "preview" ? true : false}
              onChange={(checked) => {
                setMenuSectionMode(checked ? "preview" : "edit");
              }}
            />
          </SwitchContainer>
          <TopBarButtons
            type="text"
            title="เพิ่มเมนูใหม่"
            icon={<Plus size={32} />}
            onClick={changeToAddMenuMode}
          />
        </CardTitleExtra>
      }
      style={{ width: "400px", height: "100%" }}
    >
      <MenuList menuSectionMode={menuSectionMode} />
    </MenuSectionCard>
  );
};

export default MenuSection;

const MenuSectionCard = styled(Card)`
  width: 400px;
  height: 100%;
  .ant-card-head {
    height: 64px;
    padding: 16px 20px;
  }

  .ant-card-body {
    padding: 20px 20px 20px 20px;
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }
`;

const CardTitleExtra = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

const SwitchContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const TopBarButtons = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
