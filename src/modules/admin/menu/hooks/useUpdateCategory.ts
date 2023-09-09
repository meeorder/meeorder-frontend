import { updateCategoryById } from "@/modules/services/categories";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategoryById,
    mutationKey: ["updateCategory"],
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllCategory"]);
      void queryClient.invalidateQueries(["getAllMenus"]);
    },
  });
};

export default useUpdateCategory;
