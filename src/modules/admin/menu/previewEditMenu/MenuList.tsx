import useConsoleSectionMode from "@/modules/admin/menu/hooks/useConsoleSectionMode";
import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import { H2 } from "@/modules/common/components/Typography";
import WireFrame from "@/modules/mock/components/WireFrame";
import { Button } from "antd";

type MenuListProps = {
  menuSectionMode: MenuSectionMode;
};

const MenuList: React.FC<MenuListProps> = ({ menuSectionMode }) => {
  const { changeToEditMenuMode } = useConsoleSectionMode();
  return (
    <WireFrame
      contentNode={
        <>
          <H2>{"MenuList " + menuSectionMode}</H2>
          <Button onClick={() => changeToEditMenuMode("mock-id/1234567abc")}>
            Edit
          </Button>
        </>
      }
      cardColor="red"
      style={{
        flex: 1,
      }}
    />
  );
};

export default MenuList;
