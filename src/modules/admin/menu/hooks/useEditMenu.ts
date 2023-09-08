import { replaceMenuById } from "@/modules/services/menus";
import { useMutation } from "@tanstack/react-query";

const useEditMenu = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: replaceMenuById,
    onSuccess,
    onError: (error) => {
      alert(error);
    },
  });
};

export default useEditMenu;
