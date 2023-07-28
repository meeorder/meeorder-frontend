import { H4 } from "@/modules/common/components/Typography";
import { type CategoryProps } from "@/modules/menu/components/Category";
import RecommendedFoodCard from "@/modules/menu/components/RecommendedFoodCard";
import { Row } from "antd";

const RecommendedCategory: React.FC<CategoryProps> = ({ category, foods }) => {
  return (
    <div
      id={category?.id}
      style={{
        scrollMarginTop: "112px", // very important for anchor to work
      }}
    >
      <H4
        medium
        style={{
          marginBottom: "12px",
          marginLeft: "8px",
        }}
      >
        {category?.name}
      </H4>

      <Row gutter={[8, 8]}>
        {foods.map((food) => (
          <RecommendedFoodCard key={food.id} food={food} />
        ))}
      </Row>
    </div>
  );
};

export default RecommendedCategory;
