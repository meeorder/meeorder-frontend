import { useSelectedTableStore } from "@/modules/admin/table/hooks/useSelectedTableStore";
import { H4 } from "@/modules/common/components/Typography";
import { type GetAllTablesResponse } from "@/modules/services/tables";
import styled from "@emotion/styled";
import { Card, ConfigProvider, theme } from "antd";

type TableCardProps = { table: GetAllTablesResponse[number] };

const TableCard = ({ table }: TableCardProps) => {
  // MOCK
  const allOrdersCount = 10;
  const unfinishOrdersCount = 5;
  const totalPrice = 1000;
  const { setTableId, tableId, clearTableId } = useSelectedTableStore();
  const {
    token: { colorPrimary, geekblue3 },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBorderSecondary: geekblue3,
          },
        },
      }}
    >
      <CustomCard
        onClick={() => {
          if (tableId == table._id) {
            clearTableId();
          } else {
            setTableId(table._id);
          }
        }}
        style={
          tableId === table._id ? { border: `2px solid ${colorPrimary}` } : {}
        }
        title={
          <H4
            style={{
              color: colorPrimary,
            }}
          >
            {table?.title}
          </H4>
        }
        extra={"status"}
      >
        TableCard
      </CustomCard>
    </ConfigProvider>
  );
};

const CustomCard = styled(Card)`
  width: 164px;
  height: 164px;
`;

export default TableCard;
