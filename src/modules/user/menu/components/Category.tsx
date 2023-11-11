import RecommendedCategory from "@/modules/user/menu/components/RecommendedCategory";
import SimpleCategory from "@/modules/user/menu/components/SimpleCategory";
import { Category, type Menu } from "@/modules/user/menu/types";
import { RECOMMEND_CATEGORY_ID } from "@/modules/user/mock/categories";

export type CategoryProps = {
  category: Category;
  menus: Menu[];
};

const Category: React.FC<CategoryProps> = ({ category, menus }) => {
  switch (category?._id) {
    case RECOMMEND_CATEGORY_ID:
      return <RecommendedCategory category={category} menus={menus} />;
    default:
      return <SimpleCategory category={category} menus={menus} />;
  }
};

export default Category;
