import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedTableStore {
  tableId: string;
  mode: "edit" | "view";
  setTableId: (tableId: string) => void;
  clearTableId: () => void;
  toggleMode: () => void;
}

export const useSelectedTableStore = create<SelectedTableStore>()(
  persist(
    (set) => ({
      tableId: "",
      mode: "view",
      setTableId: (tableId: string) => set({ tableId }),
      clearTableId: () => set({ tableId: "" }),
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === "edit" ? "view" : "edit",
        })),
    }),
    { name: "selectedTableStore" },
  ),
);
