import RecommendedCategory from "@/modules/user/menu/components/RecommendedCategory";
import SimpleCategory from "@/modules/user/menu/components/SimpleCategory";
import {
  Category,
  RECOMMEND_CATEGORY_ID,
} from "@/modules/user/mock/categories";
import { type Food } from "@/modules/user/mock/foods";

export type CategoryProps = {
  category: Category;
  foods: Food[];
};

const Category: React.FC<CategoryProps> = ({ category, foods }) => {
  switch (category?.id) {
    case RECOMMEND_CATEGORY_ID:
      return <RecommendedCategory category={category} foods={foods} />;
    default:
      return (
        <SimpleCategory category={category} foods={[...foods, ...foods]} /> // just to make the list longer
      );
  }
};

export default Category;
