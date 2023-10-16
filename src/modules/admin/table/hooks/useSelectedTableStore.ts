import { create } from "zustand";
import { persist } from "zustand/middleware";

type ModeType = "edit" | "view";

interface SelectedTableStore {
  tableId: string;
  tableName: string;
  mode: ModeType;
  setTableId: (tableId: string) => void;
  setTableName: (tableName: string) => void;
  clearTableId: () => void;
  setMode: (mode: ModeType) => void;
}

export const useSelectedTableStore = create<SelectedTableStore>()(
  persist(
    (set, get) => ({
      tableId: "",
      tableName: "",
      mode: "view",
      setTableId: (tableId: string) => {
        set({ tableId: tableId });
      },
      setTableName: (tableName: string) => {
        set({ tableName: tableName });
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
