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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import styled from "@emotion/styled";
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
  const [activeFood, setActiveFood] = useState<Food>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

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
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <TextContainer>
          <H4 medium={true}>{category?.name}</H4>
        </TextContainer>
        <SortableContext items={foodList} strategy={rectSortingStrategy}>
          {foodList.map((food) => (
            <SortableItem key={food.id} food={food} />
          ))}
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeFood ? (
            <Item key={activeFood.id} food={activeFood} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default MenuListCategory;

const TextContainer = styled.div`
  margin: 16px 24px;
`;
