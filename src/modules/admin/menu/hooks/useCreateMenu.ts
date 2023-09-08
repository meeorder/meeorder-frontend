import { createMenu } from "@/modules/services/menus";
import { useMutation } from "@tanstack/react-query";

const useCreateMenu = () => {
  return useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      // todo invalidate query
    },
  });
};

export default useCreateMenu;
