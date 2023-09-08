import { deleteMenuById } from "@/modules/services/menus";
import { useMutation } from "@tanstack/react-query";

const useDeleteMenu = (id: string) => {
  return useMutation({
    mutationFn: () => deleteMenuById({ id }),
    onSuccess: () => {
      // todo invalidate query
    },
  });
};

export default useDeleteMenu;
