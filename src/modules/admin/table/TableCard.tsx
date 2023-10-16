import { useSelectedTableStore } from "@/modules/admin/table/hooks/useSelectedTableStore";
import { useCreateNewSession } from "@/modules/admin/table/hooks/useSessionBill";
import { GenMetadataFromTable, useColor } from "@/modules/admin/table/utils";
import { CenterContentButton } from "@/modules/common/components/CenterContentButton";
import { H4, Text } from "@/modules/common/components/Typography";
import { type GetAllTablesResponse } from "@/modules/services/tables";
import styled from "@emotion/styled";
import { Card, ConfigProvider, theme } from "antd";

type TableCardProps = { table: GetAllTablesResponse[number] };

const TableCard = ({ table }: TableCardProps) => {
  const { setTableId, tableId, clearTableId } = useSelectedTableStore();
  const { mutate } = useCreateNewSession();
  const metadata = GenMetadataFromTable(table);
  const color = useColor({ statusId: metadata.statusId });
  const {
    token: { colorPrimary, geekblue3 },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBorderSecondary: color?.borderColor ?? geekblue3,
            // colorPrimary: orange1,
            headerBg: color?.backgroundColor ?? undefined,
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
              color: color?.titleColor,
            }}
          >
            {table?.title}
          </H4>
        }
        extra={
          <Text strong style={{ color: color?.titleColor }}>
            {metadata.statusName}
          </Text>
        }
      >
        {metadata.statusId > 1 && (
          <>
            <Text strong style={{ display: "block" }}>
              {metadata.details}
            </Text>
            <Text type="secondary">{metadata?.durationTime} นาที</Text>
          </>
        )}
        {metadata.statusId === 1 && tableId == table._id && (
          <CenterContentButton
            style={{ width: "100%" }}
            type="primary"
            onClick={() => mutate(table._id)}
          >
            เปิดโต๊ะใหม่
          </CenterContentButton>
        )}
      </CustomCard>
    </ConfigProvider>
  );
};

const CustomCard = styled(Card)`
  width: 164px;
  height: 164px;
`;

export default TableCard;
