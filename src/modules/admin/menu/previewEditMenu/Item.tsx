import MenuListFoodCard from "@/modules/admin/menu/previewEditMenu/MenuListFoodCard";
import { type Food } from "@/modules/user/mock/foods";
import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

type Props = {
  food: Food;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(
  ({ food, isOpacityEnabled, isDragging, style, ...props }, ref) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      lineHeight: "0.5",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <div ref={ref} style={styles} {...props}>
        <MenuListFoodCard food={food} />
      </div>
    );
  },
);

Item.displayName = "Item";

export default Item;
