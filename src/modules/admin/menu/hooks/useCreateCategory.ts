import { createCategory } from "@/modules/services/categories";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: createCategory,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllCategory"]);
    },
  });
};

export default useCreateCategory;
