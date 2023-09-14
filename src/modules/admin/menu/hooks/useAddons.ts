import {
  createAddon,
  deleteAddonById,
  getAllAddons,
  updateAddonById,
  type GetAllAddonsResponse,
} from "@/modules/services/addons";
import { queryClient } from "@/pages/_app";
import { useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";

export type Addon = GetAllAddonsResponse[number];

type SelectedAddonsStore = {
  menuId: string | null;
  setMenuId: (menuId: string | null) => void;
  selectedAddonIds: Addon["_id"][] | null;
  setSelectedAddonIds: (addonIds: Addon["_id"][] | null) => void;
};

export const useSelectedAddonsStore = create<SelectedAddonsStore>()((set) => ({
  menuId: null,
  setMenuId: (menuId) => {
    set({ menuId });
  },
  selectedAddonIds: null,
  setSelectedAddonIds: (addonIds) => {
    set({ selectedAddonIds: addonIds });
  },
}));

export const useAllAddons = () => {
  return useQuery({
    queryKey: ["useAllAddons"],
    queryFn: () => getAllAddons({ status: "active" }),
  });
};

export const useDeleteAddon = () => {
  return useMutation({
    mutationFn: deleteAddonById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllAddons"]);
      void queryClient.invalidateQueries(["menu"]);
    },
  });
};

export const useCreateAddon = () => {
  return useMutation({
    mutationFn: createAddon,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllAddons"]);
    },
  });
};

export const useEditAddon = () => {
  return useMutation({
    mutationFn: updateAddonById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllAddons"]);
      void queryClient.invalidateQueries(["menu"]);
    },
  });
};
