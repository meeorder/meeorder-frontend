import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterCategory = {
  filterCategory: string[];
  setToFilterCategory: (category: string[]) => void;
  resetFilterCategory: () => void;
};

export const useFilterCategory = create<FilterCategory>()(
  persist(
    (set, get) => ({
      filterCategory: [],
      setToFilterCategory: (category: string[]) => {
        set({ filterCategory: [...category] });
      },
      resetFilterCategory: () => {
        set({ filterCategory: [] });
      },
    }),
    {
      name: "filterCategory",
    },
  ),
);
