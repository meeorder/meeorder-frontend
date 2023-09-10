import { createMenu } from "@/modules/services/menus";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

const useCreateMenu = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      void queryClient.invalidateQueries(["getAllMenus"]);
      void queryClient.invalidateQueries(["useAllCategory"]);
      onSuccess();
    },
  });
};

export default useCreateMenu;
