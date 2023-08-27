import {
  getAllMenus,
  type GetAllMenusQueryParam,
} from "@/modules/services/menus";
import { useQuery } from "@tanstack/react-query";

const useAllMenu = (
  { status }: GetAllMenusQueryParam = {
    status: "published",
  },
) => {
  return useQuery({
    queryKey: ["getAllMenus", status],
    queryFn: () =>
      getAllMenus({
        status,
      }),
  });
};

export default useAllMenu;
