import { deleteCategoryById } from "@/modules/services/categories";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategory = () => {
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: deleteCategoryById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllCategory"]);
      void queryClient.invalidateQueries(["getAllMenus"]);
    },
  });
};

export default useDeleteCategory;
