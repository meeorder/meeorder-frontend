import { type CategoryProps } from "@/modules/menu/components/Category";
import RecommendedFoodCard from "@/modules/menu/components/RecommendedFoodCard";
import { Row, Typography } from "antd";

const RecommendedCategory: React.FC<CategoryProps> = ({ category, foods }) => {
  return (
    <div
      style={{
        scrollMarginTop: "112px", // very important for anchor to work
      }}
    >
      <Typography.Title
        level={4}
        style={{
          marginTop: "0px",
          marginBottom: "12px",
        }}
      >
        {category?.name}
      </Typography.Title>

      <Row gutter={[8, 8]}>
        {foods.map((food) => (
          <RecommendedFoodCard key={food.id} food={food} />
        ))}
      </Row>
    </div>
  );
};

export default RecommendedCategory;
