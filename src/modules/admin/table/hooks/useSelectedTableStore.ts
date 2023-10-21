import { create } from "zustand";
import { persist } from "zustand/middleware";

type ModeType = "edit" | "view";

interface SelectedTableStore {
  tableId: string;
  mode: ModeType;
  setTableId: (tableId: string) => void;
  clearTableId: () => void;
  setMode: (mode: ModeType) => void;
}

export const useSelectedTableStore = create<SelectedTableStore>()(
  persist(
    (set) => ({
      tableId: "",
      mode: "view",
      setTableId: (tableId: string) => {
        set({ tableId: tableId });
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
