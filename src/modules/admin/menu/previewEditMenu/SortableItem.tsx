import Item from "@/modules/admin/menu/previewEditMenu/Item";
import { type Food } from "@/modules/user/mock/foods";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type HTMLAttributes } from "react";

type Props = {
  food: Food;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ food, ...props }: Props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: food.id,
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      food={food}
      ref={setNodeRef}
      style={styles}
      isOpacityEnabled={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
