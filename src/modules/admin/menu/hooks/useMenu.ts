import { getMenuById } from "@/modules/services/menus";
import { useQuery } from "@tanstack/react-query";

const useMenu = (id: string) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => getMenuById({ id }),
    onError: (error) => {
      alert(error);
    },
    enabled: !!id,
  });
};

export default useMenu;
