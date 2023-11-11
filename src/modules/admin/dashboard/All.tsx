import AllTimeIncome from "@/modules/admin/dashboard/All/AllTimeIncome";
import DayInWeek from "@/modules/admin/dashboard/All/DayInWeek";
import MonthInYear from "@/modules/admin/dashboard/All/MonthInYear";
import Quarter from "@/modules/admin/dashboard/All/Quarter";
import Time from "@/modules/admin/dashboard/All/Time";
import { useReportNetIncomeGrouped } from "@/modules/admin/dashboard/All/hooks";
import { H2 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { DatePicker, type TimeRangePickerProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const { RangePicker } = DatePicker;
const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "7 วันที่ผ่านมา", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "14 วันที่ผ่านมา", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "1 เดือนที่ผ่านมา", value: [dayjs().add(-1, "m"), dayjs()] },
  { label: "3 เดือนที่ผ่านมา", value: [dayjs().add(-2, "m"), dayjs()] },
  { label: "1 ปีที่ผ่านมา", value: [dayjs().add(-1, "y"), dayjs()] },
  { label: "2 ปีที่ผ่านมา", value: [dayjs().add(-2, "y"), dayjs()] },
  { label: "Last 5 years", value: [dayjs().add(-5, "y"), dayjs()] },
];

export const All = () => {
  const [startDate, setStartDate] = useState(dayjs().add(-5, "y"));
  const [endDate, setEndDate] = useState(dayjs());
  const { data: netIncomeGrouped } = useReportNetIncomeGrouped(
    startDate.unix(),
    endDate.unix(),
  );
  return (
    <>
      <H2>ดูข้อมูลรายได้ในช่วงต่างๆ</H2>
      <AllTimeIncome />
      <H2>
        เปรียบเทียบรายได้ในช่วง{" "}
        <RangePicker
          size="large"
          presets={rangePresets}
          allowClear={false}
          value={[startDate, endDate]}
          onChange={(value) => {
            if (value) {
              setStartDate(value[0] || dayjs());
              setEndDate(value[1] || dayjs());
            }
          }}
        />
      </H2>
      <SummaryContainer>
        <Time data={netIncomeGrouped?.hourly} />
        <DayInWeek data={netIncomeGrouped?.daysOfWeek} />
        <Quarter data={netIncomeGrouped?.quarterly} />
        <MonthInYear data={netIncomeGrouped?.monthly} />
      </SummaryContainer>
    </>
  );
};

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;

  > :nth-of-type(1) {
    grid-column: 1 / 4;
  }

  > :nth-of-type(4) {
    grid-column: 2 / 5;
  }
`;
