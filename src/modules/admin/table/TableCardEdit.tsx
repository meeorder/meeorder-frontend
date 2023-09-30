import { useSelectedTableStore } from "@/modules/admin/table/hooks/useSelectedTableStore";
import { useCreateTable } from "@/modules/admin/table/hooks/useTables";
import { H4 } from "@/modules/common/components/Typography";
import { type GetAllTablesResponse } from "@/modules/services/tables";
import styled from "@emotion/styled";
import { Plus, Trash } from "@phosphor-icons/react";
import { Card, ConfigProvider, theme } from "antd";

type TableCardProps = { table: GetAllTablesResponse[number] };

const TableCardEdit = ({ table }: TableCardProps) => {
  const { setTableId, tableId, clearTableId } = useSelectedTableStore();
  const {
    token: { colorPrimary, blue3, colorError },
  } = theme.useToken();
  const isSelect = tableId === table._id;
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBorderSecondary: blue3,
          },
        },
      }}
    >
      <CustomCard
        onClick={() => {
          if (isSelect) {
            clearTableId();
          } else {
            setTableId(table._id);
          }
        }}
        bodyStyle={{
          textAlign: "center",
        }}
        style={isSelect ? { border: `2px solid ${colorPrimary}` } : {}}
        title={
          <H4
            editable={
              isSelect
                ? {
                    // TODO: API Chaneg table Name
                    onChange: (value) => {
                      console.log("change table name", value, table._id);
                    },
                  }
                : undefined
            }
            style={{
              color: colorPrimary,
            }}
          >
            {table?.title}
          </H4>
        }
      >
        {isSelect ? (
          <Trash
            size={48}
            onClick={() => {
              // TODO: API Delete Table
              console.log("delete table", table._id);
            }}
            color={colorError}
          />
        ) : null}
      </CustomCard>
    </ConfigProvider>
  );
};

export const TableCardAdd = () => {
  const { mutate: createTable } = useCreateTable();
  const {
    token: { colorPrimary, blue3 },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBorderSecondary: blue3,
          },
        },
      }}
    >
      <CustomCard
        onClick={() => createTable({ title: "โต๊ะใหม่" })}
        title={
          <H4
            style={{
              color: colorPrimary,
            }}
          >
            เพิ่มโต๊ะใหม่
          </H4>
        }
        bodyStyle={{
          textAlign: "center",
        }}
      >
        <Plus size={48} color={colorPrimary} />
      </CustomCard>
    </ConfigProvider>
  );
};

const CustomCard = styled(Card)`
  width: 164px;
  height: 164px;
`;

export default TableCardEdit;
