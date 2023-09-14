import { type MenuSectionMode } from "@/modules/admin/menu/hooks/useMenuSectionMode";
import useUpdateCategoryById from "@/modules/admin/menu/hooks/useUpdateCategoryById";
import Item from "@/modules/admin/menu/previewEditMenu/Item";
import SortableItem from "@/modules/admin/menu/previewEditMenu/SortableItem";
import { H4 } from "@/modules/common/components/Typography";
import { type GetAllCategoriesResponse } from "@/modules/services/categories";
import { type GetAllMenusResponse } from "@/modules/services/menus";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import styled from "@emotion/styled";
import { useEffect, useId, useState } from "react";

type MenuList = GetAllMenusResponse[number]["menus"];
type Menu = MenuList[number];
type MenuListCategoryProps = {
  category: GetAllCategoriesResponse[number];
  menus: MenuList;
  menuSectionMode: MenuSectionMode;
};

const isPublish = (
  menuSectionMode: MenuSectionMode,
  menu: GetAllMenusResponse[number]["menus"][number],
) => {
  return menu.published_at != null || menuSectionMode === "edit";
};

const MenuListCategory: React.FC<MenuListCategoryProps> = ({
  category,
  menus,
  menuSectionMode,
}) => {
  const [menuList, setMenuList] = useState<MenuList>([]);
  const [activeMenu, setActiveMenu] = useState<Menu>();
  const { mutate: updateCategoryById } = useUpdateCategoryById();
  const dndId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    setMenuList(menus);
  }, [menus]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveMenu(menuList.find((menu) => menu._id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeMenu = menuList.find((menu) => menu._id === active.id);
    const overMenu = menuList.find((menu) => menu._id === over.id);

    if (!activeMenu || !overMenu) {
      return;
    }

    const activeIndex = menuList.findIndex((menu) => menu._id === active.id);
    const overIndex = menuList.findIndex((menu) => menu._id === over.id);

    const updateMenuList = arrayMove<Menu>(menuList, activeIndex, overIndex);

    if (activeIndex !== overIndex) {
      updateCategoryById({
        id: category._id,
        menus: updateMenuList.map((menu) => menu._id),
      });
      setMenuList(updateMenuList);
    }

    setActiveMenu(undefined);
  };

  const handleDragCancel = () => {
    setActiveMenu(undefined);
  };

  return (
    <DndContext
      key={dndId}
      id={dndId}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <TextContainer>
        <H4 medium={true}>{category?.title}</H4>
      </TextContainer>
      <SortableContext
        items={menuList
          .filter((menu) => isPublish(menuSectionMode, menu))
          .map((menu) => ({
            id: menu?._id,
          }))}
        strategy={rectSortingStrategy}
      >
        {menuList
          .filter((menu) => isPublish(menuSectionMode, menu))
          .map((menu) => (
            <SortableItem
              key={menu?._id}
              menu={menu}
              menuSectionMode={menuSectionMode}
            />
          ))}
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeMenu ? (
          <Item
            isDragging
            key={activeMenu._id}
            menu={activeMenu}
            menuSectionMode={menuSectionMode}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default MenuListCategory;

const TextContainer = styled.div`
  margin: 16px 24px;
`;
