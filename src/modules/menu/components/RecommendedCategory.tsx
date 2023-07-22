import { type CategoryProps } from "@/modules/menu/components/Category";
import RecommendedFoodCard from "@/modules/menu/components/RecommendedFoodCard";
import { Card, Row } from "antd";

const RecommendedCategory: React.FC<CategoryProps> = ({ category, foods }) => {
  return (
    <>
      <Card
        title={category?.name}
        id={category?.id}
        style={{
          scrollMarginTop: "112px", // very important for anchor to work
        }}
      >
        <Row gutter={[8, 8]}>
          {foods.map((food) => (
            <RecommendedFoodCard key={food.id} food={food} />
          ))}
        </Row>
      </Card>
    </>
  );
};

export default RecommendedCategory;
