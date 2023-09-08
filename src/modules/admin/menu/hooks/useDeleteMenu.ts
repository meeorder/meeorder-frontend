import { deleteMenuById } from "@/modules/services/menus";
import { useMutation } from "@tanstack/react-query";

const useDeleteMenu = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: deleteMenuById,
    onSuccess: onSuccess,
  });
};

export default useDeleteMenu;
