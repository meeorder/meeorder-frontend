import { replaceMenuById } from "@/modules/services/menus";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useEditMenu = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: replaceMenuById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["getAllMenus"]);
      void queryClient.invalidateQueries(["useAllCategory"]);

      onSuccess();
    },

    onError: (error) => {
      alert(error);
    },
  });
};

export default useEditMenu;
