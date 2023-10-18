import AllTimeIncome from "@/modules/admin/dashboard/All/AllTimeIncome";
import DayInWeek from "@/modules/admin/dashboard/All/DayInWeek";
import MonthInYear from "@/modules/admin/dashboard/All/MonthInYear";
import Quarter from "@/modules/admin/dashboard/All/Quarter";
import Time from "@/modules/admin/dashboard/All/Time";
import { H1, H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useState } from "react";

export const All = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(-1, "y"));
  const [option, setOption] = useState<"วัน" | "เดือน" | "ปี">("วัน");

  const roundedStartDate = new Date(
    startDate?.year(),
    option !== "ปี" ? startDate.month() : 0,
    option === "วัน" ? startDate.date() : 1,
  );

  const roundedEndDate = new Date(
    endDate?.year(),
    option !== "ปี" ? endDate.month() : 11,
    option === "วัน" ? endDate.date() : 31,
  );

  const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formatter.format(date);
  };
  return (
    <>
      <H1>ดูข้อมูลรายได้ในช่วงต่างๆ</H1>
      <AllTimeIncome
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        option={option}
        setOption={setOption}
      />
      <H4>
        เปรียบเทียบรายได้ในช่วง {formatDate(roundedStartDate)} ถึง{" "}
        {formatDate(roundedEndDate)}
      </H4>
      <SummaryContainer>
        <Time />
        <DayInWeek />
        <Quarter />
        <MonthInYear />
      </SummaryContainer>
    </>
  );
};

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;

  > :nth-child(1) {
    grid-column: 1 / 4;
  }

  > :nth-child(4) {
    grid-column: 2 / 5;
  }
`;
