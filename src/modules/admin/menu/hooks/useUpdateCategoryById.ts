import { updateCategoryById } from "@/modules/services/categories";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useUpdateCategoryById = () => {
  return useMutation({
    mutationFn: updateCategoryById,
    mutationKey: ["updateCategoryById"],
    onSuccess: () => {
      void queryClient.invalidateQueries(["getMenuById", "all"]);
    },
  });
};

export default useUpdateCategoryById;
