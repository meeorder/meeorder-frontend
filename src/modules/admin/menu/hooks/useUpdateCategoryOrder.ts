import { updateCategoryOrderByIds } from "@/modules/services/categories";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateCategoryOrder = () => {
  return useMutation({
    mutationKey: ["updateCategoryRank"],
    mutationFn: updateCategoryOrderByIds,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllCategory"]);
      void queryClient.invalidateQueries(["getAllMenus"]);
    },
  });
};

export default useUpdateCategoryOrder;
