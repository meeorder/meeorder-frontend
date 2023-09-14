import { useSelectedAddonsStore } from "@/modules/admin/menu/hooks/useAddons";
import { getMenuById } from "@/modules/services/menus";
import { useQuery } from "@tanstack/react-query";

const useMenu = (id: string) => {
  const { menuId, setMenuId, selectedAddonIds, setSelectedAddonIds } =
    useSelectedAddonsStore();
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => getMenuById({ id }),
    onSuccess: (data) => {
      if (!selectedAddonIds || menuId !== id) {
        setMenuId(id);
        setSelectedAddonIds(
          data.addons
            .filter((addon) => !addon.deleted_at)
            .map((addon) => addon._id),
        );
      }
    },
    onError: (error) => {
      alert(error);
    },
    enabled: !!id,
  });
};

export default useMenu;
