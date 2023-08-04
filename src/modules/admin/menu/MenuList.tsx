import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import WireFrame from "@/modules/mock/components/WireFrame";

type MenuListProps = {
  menuSectionMode: MenuSectionMode;
};

const MenuList: React.FC<MenuListProps> = ({ menuSectionMode }) => {
  return (
    <WireFrame
      contentNode={"MenuList " + menuSectionMode}
      cardColor="red"
      style={{
        flex: 1,
      }}
    />
  );
};

export default MenuList;
