import { type MenuLayoutVariant } from "@/modules/admin/layout/AdminMenuLayout";
import MenuList from "@/modules/admin/menu/MenuList";
import { H3, H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Plus } from "@phosphor-icons/react";
import { Button, Card } from "antd";

type MenuPreviewSectionProps = {
  menuLayoutVariant: MenuLayoutVariant;
};

const MenuPreviewSection: React.FC<MenuPreviewSectionProps> = () => {
  return (
    <MenuListCard
      title={<H3>Menu</H3>}
      extra={
        <>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TopBarButtons type="text">
              <H4>Edit</H4>
            </TopBarButtons>
            <TopBarButtons type="text" icon={<Plus size={32} />} />
          </div>
        </>
      }
      style={{ width: "400px", height: "100%" }}
    >
      <Button
        style={{ margin: "16px 20px", width: "calc(100% - 40px)" }}
        type="primary"
        size="large"
      >
        Create New Category
      </Button>
      <MenuList />
    </MenuListCard>
  );
};

export default MenuPreviewSection;

const MenuListCard = styled(Card)`
  width: 400px;
  height: 100%;
  .ant-card-head {
    height: 64px;
    padding: 16px 20px;
  }

  .ant-card-body {
    padding: 0 20px 20px 20px;
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }
`;

const TopBarButtons = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
