import AppLayout from "@/modules/AppLayout";
import MenuList from "@/modules/admin/sales/components/MenuList";
import { useSalesReport } from "@/modules/admin/sales/hooks/useSalesReport";
import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { Card, ConfigProvider, DatePicker } from "antd";
import {
  type DatePickerProps,
  type RangePickerProps,
} from "antd/es/date-picker";
import { useState } from "react";

import locale from "antd/locale/th_TH";
import dayjs from "dayjs";

import "dayjs/locale/th";

const { RangePicker } = DatePicker;

const AdminSalesReport = () => {
  const [startTime, setStartTime] = useState<number>(
    Math.round(dayjs().startOf("day").unix()),
  );
  const [endTime, setEndTime] = useState<number>(dayjs().endOf("day").unix());
  const { data: salesReport } = useSalesReport({ startTime, endTime });

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string,
  ) => {
    setStartTime(Math.round(new Date(dateString[0]).getTime() / 1000));
    setEndTime(Math.round(new Date(dateString[1]).getTime() / 1000));
  };

  return (
    <AppLayout layoutType="admin" currentPageId="adminSalesReport">
      <SalesReportContainer
        title={
          <TitleContainer>
            <H4>ยอดขายแต่ละเมนู</H4>
            <ConfigProvider locale={locale}>
              <RangePicker
                onChange={onChange}
                disabledDate={(current) => current && current > dayjs()}
                defaultValue={[dayjs().startOf("day"), dayjs().endOf("day")]}
              ></RangePicker>
            </ConfigProvider>
          </TitleContainer>
        }
      >
        <MenuList saleReportData={salesReport} />
      </SalesReportContainer>
    </AppLayout>
  );
};

export default AdminSalesReport;

const SalesReportContainer = styled(Card)`
  width: 100%;
  height: 100%;
  padding: 20px 24px;
  .ant-card-head {
    min-height: 64px;
    padding: 0px 12px;
    border-bottom: 0;
  }
  .ant-card-body {
    padding: 0;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
