import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import MenuListCategory from "@/modules/admin/menu/previewEditMenu/MenuListCategory";
import useAllMenu from "@/modules/user/menu/hooks/useAllMenu";
import styled from "@emotion/styled";

type MenuListProps = {
  menuSectionMode: MenuSectionMode;
};

const MenuList: React.FC<MenuListProps> = ({ menuSectionMode }) => {
  const { data: menuByCategory } = useAllMenu({ status: "all" });

  return (
    <>
      <MenuListContaner>
        {menuByCategory?.map((items) => (
          <MenuListCategory
            key={items.category._id + items.category.menus.join("")}
            category={items.category}
            menus={items.menus}
            menuSectionMode={menuSectionMode}
          />
        ))}
      </MenuListContaner>
    </>
  );
};

export default MenuList;

const MenuListContaner = styled.div`
  overflow-y: auto;
`;
