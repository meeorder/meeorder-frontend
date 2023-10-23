import { type GetAllTablesResponse } from "@/modules/services/tables";
import { theme } from "antd";

type Metadata = {
  statusId: 0 | 1 | 2 | 3 | 4;
  statusName: string;
  details?: string;
  durationTime?: number;
};

export const GenMetadataFromTable = (
  table: GetAllTablesResponse[number] | undefined,
): Metadata => {
  if (table?.session == null) {
    return {
      statusId: 1,
      statusName: "ว่าง",
    };
  } else if (table?.allOrdersCount == 0) {
    return {
      statusId: 2,
      statusName: "สั่งอาหาร",
      details: "กำลังสั่งอาหาร",
      durationTime: Math.round(
        (Date.now() - new Date(table?.session_create_at).getTime()) /
          (1000 * 60),
      ),
    };
  } else if (table?.unfinishOrdersCount > 0) {
    return {
      statusId: 3,
      statusName: "รออาหาร",
      details: `${table?.unfinishOrdersCount} เมนูยังไม่เสิร์ฟ`,
      durationTime: Math.round(
        (Date.now() - new Date(table?.session_create_at).getTime()) /
          (1000 * 60),
      ),
    };
  } else if (table?.unfinishOrdersCount == 0) {
    return {
      statusId: 4,
      statusName: "สำเร็จ",
      details: `บิล ${table?.totalPrice} บาท`,
      durationTime: Math.round(
        (Date.now() - new Date(table?.session_create_at).getTime()) /
          (1000 * 60),
      ),
    };
  }
  return {
    statusId: 0,
    statusName: "ไม่ทราบสถานะ",
  };
};

export const useColor = ({ statusId }: { statusId: 0 | 1 | 2 | 3 | 4 }) => {
  const {
    token: {
      colorPrimary,
      geekblue1,
      geekblue3,
      geekblue6,
      orange1,
      orange3,
      orange6,
      green1,
      green3,
      green6,
    },
  } = theme.useToken();
  type ColorType = Record<
    0 | 1 | 2 | 3 | 4,
    {
      backgroundColor: string | undefined;
      titleColor: string;
      borderColor: string;
    }
  >;
  const Color: ColorType = {
    0: {
      backgroundColor: undefined,
      titleColor: orange1,
      borderColor: orange1,
    },
    1: {
      backgroundColor: undefined,
      titleColor: colorPrimary,
      borderColor: colorPrimary,
    },
    2: {
      backgroundColor: orange1,
      titleColor: orange6,
      borderColor: orange3,
    },
    3: {
      backgroundColor: geekblue1,
      titleColor: geekblue6,
      borderColor: geekblue3,
    },
    4: {
      backgroundColor: green1,
      titleColor: green6,
      borderColor: green3,
    },
  } as const;
  return Color[statusId];
};
