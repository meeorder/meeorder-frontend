import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterStatus = {
  filterStatus: string[];
  setToFilterStatus: (status: string[]) => void;
  resetFilterStatus: () => void;
};

export const useFilterStatus = create<FilterStatus>()(
  persist(
    (set) => ({
      filterStatus: [
        "IN_QUEUE",
        "PREPARING",
        "READY_TO_SERVE",
        "DONE",
        "CANCELLED",
      ],
      setToFilterStatus: (status: string[]) => {
        set({ filterStatus: [...status] });
      },
      resetFilterStatus: () => {
        set({
          filterStatus: [
            "IN_QUEUE",
            "PREPARING",
            "READY_TO_SERVE",
            "DONE",
            "CANCELLED",
          ],
        });
      },
    }),
    {
      name: "filterStatus",
    },
  ),
);
