import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import MenuListFoodCard from "@/modules/admin/menu/previewEditMenu/MenuListFoodCard";
import { type GetAllMenusResponse } from "@/modules/services/menus";
import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

type Menu = GetAllMenusResponse[number]["menus"][number];

type Props = {
  menu: Menu;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
  isDisable?: boolean;
  menuSectionMode: MenuSectionMode;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(
  (
    {
      menu,
      isOpacityEnabled,
      isDragging,
      style,
      isDisable,
      menuSectionMode,
      ...props
    },
    ref,
  ) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : isDisable ? "auto" : "grab",
      lineHeight: "0.5",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    if (!menuSectionMode) return null;

    return (
      <div ref={ref} style={styles} {...props}>
        <MenuListFoodCard menu={menu} />
      </div>
    );
  },
);

Item.displayName = "Item";

export default Item;
