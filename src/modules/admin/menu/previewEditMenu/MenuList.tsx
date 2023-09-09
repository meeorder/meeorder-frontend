import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import MenuListCategory from "@/modules/admin/menu/previewEditMenu/MenuListCategory";
import { categories } from "@/modules/user/mock/categories";
import { foods, type Food } from "@/modules/user/mock/foods";
import styled from "@emotion/styled";

type MenuListProps = {
  menuSectionMode: MenuSectionMode;
};

const MenuList: React.FC<MenuListProps> = ({ menuSectionMode }) => {
  const getIsFoodPublished = (food: Food) => {
    // return food.published_at == null ? false : true;
    // random 0 or 1
    return parseInt(food.id) > 2 ? false : true;
    // return true;
  };

  return (
    <>
      <MenuListContaner>
        {categories?.map((category) => (
          <MenuListCategory
            key={category?.id + menuSectionMode}
            category={category}
            foods={
              menuSectionMode === "edit"
                ? foods
                : foods.filter(getIsFoodPublished)
            }
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
