import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import Item from "@/modules/admin/menu/previewEditMenu/Item";
import { type GetAllMenusResponse } from "@/modules/services/menus";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type HTMLAttributes } from "react";

type Menu = GetAllMenusResponse[number]["menus"][number];

type Props = {
  menu: Menu;
  menuSectionMode: MenuSectionMode;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ menu, menuSectionMode, ...props }: Props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: menu?._id,
    disabled: menuSectionMode === "preview",
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      menu={menu}
      ref={setNodeRef}
      style={styles}
      isOpacityEnabled={isDragging}
      menuSectionMode={menuSectionMode}
      isDisable={menuSectionMode === "preview"}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
