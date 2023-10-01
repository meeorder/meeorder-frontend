import { create } from "zustand";
import { persist } from "zustand/middleware";

type ModeType = "edit" | "view" | "editOrder";

interface SelectedTableStore {
  tableId: string;
  mode: ModeType;
  setTableId: (tableId: string) => void;
  clearTableId: () => void;
  setMode: (mode: ModeType) => void;
}

export const useSelectedTableStore = create<SelectedTableStore>()(
  persist(
    (set, get) => ({
      tableId: "",
      mode: "view",
      setTableId: (tableId: string) => {
        set({ tableId, mode: get().mode == "editOrder" ? "view" : get().mode });
      },
      clearTableId: () => set({ tableId: "" }),
      setMode: (mode) =>
        set(() => ({
          mode: mode,
        })),
    }),
    { name: "selectedTableStore" },
  ),
);
