import {
  getMenuById,
  type GetMenuByIdPathParam,
} from "@/modules/services/menus";
import { useQuery } from "@tanstack/react-query";

const useMenu = ({ id }: GetMenuByIdPathParam) => {
  return useQuery({
    queryKey: ["getAllMenus", id],
    queryFn: () =>
      getMenuById({
        id,
      }),
  });
};

export default useMenu;
