import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import MenuListCategory from "@/modules/admin/menu/previewEditMenu/MenuListCategory";
import { categories } from "@/modules/user/mock/categories";
import { foods } from "@/modules/user/mock/foods";

type MenuListProps = {
  menuSectionMode: MenuSectionMode;
};

const MenuList: React.FC<MenuListProps> = ({ menuSectionMode }) => {
  // const { changeToEditMenuMode } = useConsoleSectionMode();
  console.log(menuSectionMode);
  return (
    <>
      {categories?.map((category) => (
        <MenuListCategory
          key={category?.id}
          category={category}
          foods={foods}
        />
      ))}
    </>
  );
};

export default MenuList;
