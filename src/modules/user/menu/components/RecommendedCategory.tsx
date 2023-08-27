import { H4 } from "@/modules/common/components/Typography";
import { type CategoryProps } from "@/modules/user/menu/components/Category";
import RecommendedFoodCard from "@/modules/user/menu/components/RecommendedFoodCard";
import { Row } from "antd";

const RecommendedCategory: React.FC<CategoryProps> = ({ category, menus }) => {
  return (
    <div
      id={category?._id}
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
        {category?.title}
      </H4>

      <Row gutter={[8, 8]}>
        {menus.map((menu) => (
          <RecommendedFoodCard key={menu?.title} menu={menu} />
        ))}
      </Row>
    </div>
  );
};

export default RecommendedCategory;
