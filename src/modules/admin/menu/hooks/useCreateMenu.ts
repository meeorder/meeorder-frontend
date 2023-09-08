import { createMenu } from "@/modules/services/menus";
import { useMutation } from "@tanstack/react-query";

const useCreateMenu = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: createMenu,
    onSuccess: onSuccess,
  });
};

export default useCreateMenu;
