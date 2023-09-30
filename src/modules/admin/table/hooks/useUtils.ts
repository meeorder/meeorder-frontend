import { type GetAllTablesResponse } from "@/modules/services/tables";
import { theme } from "antd";

type TableToMetaData = {
  borderColor: string;
  bgColor: string;
  textColor: string;
  textSecondaryColor: string;
  status: string;
};

const useTableToMetaData = (table: GetAllTablesResponse[number]) => {
  const {
    token: {
      // default
      blue3,
      blue6,
      // ordering
      orange1,
      orange3,
      orange6,
      // serving
      geekblue1,
      geekblue3,
      geekblue6,
      // checkout
      green1,
      green3,
      green6,
    },
  } = theme.useToken();
};
