import Item from "@/modules/admin/menu/previewEditMenu/Item";
import SortableItem from "@/modules/admin/menu/previewEditMenu/SortableItem";
import { H4 } from "@/modules/common/components/Typography";
import { type Category } from "@/modules/user/mock/categories";
import { type Food } from "@/modules/user/mock/foods";
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
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

type MenuListCategoryProps = {
  category: Category;
  foods: Food[];
};

const MenuListCategory: React.FC<MenuListCategoryProps> = ({
  category,
  foods,
}) => {
  const [foodList, setFoodList] = useState(foods);
  const [activeFood, setActiveFood] = useState<Food | undefined>();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveFood(foodList.find((food) => food.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeFood = foodList.find((food) => food.id === active.id);
    const overFood = foodList.find((food) => food.id === over.id);

    if (!activeFood || !overFood) {
      return;
    }

    const activeIndex = foodList.findIndex((food) => food.id === active.id);
    const overIndex = foodList.findIndex((food) => food.id === over.id);

    if (activeIndex !== overIndex) {
      setFoodList((prev) => arrayMove<Food>(prev, activeIndex, overIndex));
    }
    setActiveFood(undefined);
  };

  const handleDragCancel = () => {
    setActiveFood(undefined);
  };
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <H4>{category?.name}</H4>
        <SortableContext items={foodList} strategy={rectSortingStrategy}>
          {foodList.map((food) => (
            <SortableItem key={food.id} food={food} />
          ))}
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeFood ? <Item food={activeFood} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default MenuListCategory;
