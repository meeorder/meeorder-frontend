import { H2 } from "@/modules/common/components/Typography";
import { Column } from "@ant-design/plots";
import {
  Card,
  ConfigProvider,
  DatePicker,
  Segmented,
  type TimeRangePickerProps,
} from "antd";
import locale from "antd/locale/th_TH";
import dayjs from "dayjs";
import "dayjs/locale/th";
import React from "react";

const { RangePicker } = DatePicker;

type AllTimeIncomeProps = {
  startDate: dayjs.Dayjs;
  setStartDate: (date: dayjs.Dayjs) => void;
  endDate: dayjs.Dayjs;
  setEndDate: (date: dayjs.Dayjs) => void;
  option: "วัน" | "เดือน" | "ปี";
  setOption: (option: "วัน" | "เดือน" | "ปี") => void;
};

const AllTimeIncome: React.FC<AllTimeIncomeProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  option,
  setOption,
}) => {
  const dataDay = [...Array(100).keys()].map((i) => ({
    วันที่: `2021-08-${i + 1}`,
    รายรับ: (Math.random() - 0.5) * 1000 + 1000,
  }));
  const dataMonth = [...Array(24).keys()].map((i) => ({
    วันที่: `${2021 + Math.floor(i / 12)}-${(i % 12) + 1}`,
    รายรับ: (Math.random() - 0.5) * 30000 + 30000,
  }));

  const dataYear = [...Array(5).keys()].map((i) => ({
    วันที่: `${2021 + i}`,
    รายรับ: (Math.random() - 0.5) * 1000000 + 1000000,
  }));

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
    { label: "Last year", value: [dayjs().add(-1, "y"), dayjs()] },
    { label: "Last 2 years", value: [dayjs().add(-2, "y"), dayjs()] },
    { label: "Last 5 years", value: [dayjs().add(-5, "y"), dayjs()] },
  ];

  return (
    <Card
      bodyStyle={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        marginTop: "-24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H2>รายรับทั้งหมด</H2>
        <ConfigProvider locale={locale}>
          <RangePicker
            presets={rangePresets}
            allowClear={false}
            picker={
              option === "วัน" ? "date" : option === "เดือน" ? "month" : "year"
            }
            onChange={(value) => {
              if (value) {
                setStartDate(value[0] || dayjs());
                setEndDate(value[1] || dayjs());
              }
            }}
          />
        </ConfigProvider>
        <Segmented
          options={["วัน", "เดือน", "ปี"]}
          value={option}
          onChange={(value) => setOption(value as "วัน" | "เดือน" | "ปี")}
        />
      </div>
      <Column
        data={
          option === "วัน" ? dataDay : option === "เดือน" ? dataMonth : dataYear
        }
        xField="วันที่"
        yField="รายรับ"
      />
    </Card>
  );
};

export default AllTimeIncome;
