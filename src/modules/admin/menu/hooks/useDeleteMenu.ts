import { deleteMenuById } from "@/modules/services/menus";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useDeleteMenu = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: deleteMenuById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["getAllMenus"]);
      void queryClient.invalidateQueries(["useAllCategory"]);

      onSuccess();
    },
  });
};

export default useDeleteMenu;
