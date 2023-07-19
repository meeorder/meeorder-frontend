import { type CategoryProps } from "@/modules/menu/components/Category";
import RecommendedFoodCard from "@/modules/menu/components/RecommendedFoodCard";
import styled from "@emotion/styled";
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
        <StyledRow gutter={[8, 4]}>
          {foods.map((food) => (
            <RecommendedFoodCard key={food.id} food={food} />
          ))}
        </StyledRow>
      </Card>
    </>
  );
};

export default RecommendedCategory;

const StyledRow = styled(Row)``;
