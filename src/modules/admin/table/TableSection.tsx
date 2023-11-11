import TableCard from "@/modules/admin/table/TableCard";
import TableCardEdit, {
  TableCardAdd,
} from "@/modules/admin/table/TableCardEdit";
import { useSelectedTableStore } from "@/modules/admin/table/hooks/useSelectedTableStore";
import { useAllTable } from "@/modules/admin/table/hooks/useTables";
import { H2 } from "@/modules/common/components/Typography";
import { useClient } from "@/modules/common/hooks/useClient";
import { useUser } from "@/modules/common/hooks/useUserStore";
import { roleToRoleNumber } from "@/modules/services/users";
import styled from "@emotion/styled";
import { Button } from "antd";

const TableSection = () => {
  const { data: tables } = useAllTable();
  const { mode, setMode } = useSelectedTableStore();
  const { isClientLoaded } = useClient();
  const { data } = useUser();
  return (
    <TableContainer>
      <HeadContainer>
        <H2>โต๊ะภายในร้าน</H2>
        {data?.role === roleToRoleNumber.Owner && (
          <Button
            type="primary"
            onClick={() => setMode(mode === "edit" ? "view" : "edit")}
          >
            {isClientLoaded &&
              (mode === "edit" ? "ปิดโหมดแก้ไข" : "แก้ไขโต๊ะภายในร้าน")}
          </Button>
        )}
      </HeadContainer>
      <TableCardContainer>
        {mode === "edit" ? (
          <>
            {tables?.map((table) => (
              <TableCardEdit key={table._id} table={table} />
            ))}
            {<TableCardAdd />}
          </>
        ) : (
          <>
            {tables?.map((table) => (
              <TableCard key={table._id} table={table} />
            ))}
          </>
        )}
      </TableCardContainer>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
  flex: 1;
`;
const HeadContainer = styled.div`
  padding-right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: left;
  align-items: end;
  gap: 24px;
`;
const TableCardContainer = styled.div`
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  overflow-y: auto;
`;

export default TableSection;
