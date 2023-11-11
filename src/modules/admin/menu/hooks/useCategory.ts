import {
  getAllCategories,
  type GetAllCategoriesResponse,
} from "@/modules/services/categories";
import { useQuery } from "@tanstack/react-query";

export type AllCategoryData = GetAllCategoriesResponse;

const useAllCategory = () => {
  return useQuery({
    queryKey: ["useAllCategory"],
    queryFn: () => getAllCategories(),
  });
};

export default useAllCategory;
