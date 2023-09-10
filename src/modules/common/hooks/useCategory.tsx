import { getAllCategories } from "@/modules/services/categories";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  return useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });
};

export default useCategories;
