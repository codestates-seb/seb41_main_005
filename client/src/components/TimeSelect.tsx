import Select from "react-select";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import ko from "date-fns/locale/ko";
import { format } from "date-fns";
import Button from "./Buttons";

interface Props {
  value: Array<{
    startDate: Date;
    startTime: string;
    endTime: string;
  }>;
}

// 업무시간 컨테이너
const WorkSchedule: React.FC<Props> = () => {
  const [workSchedules, setWorkSchedules] = useState<
    Array<{ startDate: Date; startTime: string; endTime: string }>
  >([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleStartTimeChange = (selectedOption: any) => {
    setStartTime(selectedOption.value);
  };
  const handleEndTimeChange = (selectedOption: any) => {
    setEndTime(selectedOption.value);
  };
  const handleDateChange = (date: Date) => {
    setStartDate(date);
  };
  const handleAddSchedule = () => {
    setWorkSchedules([...workSchedules, { startDate, startTime, endTime }]);
  };

  // 시간 드롭다운
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const value = `${("0" + hour).slice(-2)}:${("0" + minute).slice(-2)}`;
      const label = `${hour}:${("0" + minute).slice(-2)} 
      ${hour < 12 ? "AM" : "PM"}`;
      timeOptions.push({ value, label });
    }
  }

  return (
    <TimeContainer>
      <SelectWrapper>
        날짜
        <div>
          <StyledDatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            locale={ko}
          />
        </div>
        시작시간
        <StyledSelect
          placeholder={"시간"}
          options={timeOptions}
          onChange={handleStartTimeChange}
        />
        종료시간
        <StyledSelect
          placeholder={"시간"}
          options={timeOptions}
          onChange={handleEndTimeChange}
        />
        <Button onClick={handleAddSchedule}>추가</Button>
      </SelectWrapper>
      <ListWrapper>
        {workSchedules.map((schedule) => (
          <div key={""}>
            {format(schedule.startDate, "yyyy년 M월 d일 (E)", { locale: ko })}
            {schedule.startTime} ~ {schedule.endTime}
          </div>
        ))}
      </ListWrapper>
    </TimeContainer>
  );
};
const StyledDatePicker = styled(DatePicker)`
  width: 150px;
  height: 2.5rem;
  border: solid 1px ${(props) => props.theme.color.sub2};
  border-radius: 8px;
  :focus {
    border: solid 1px ${(props) => props.theme.color.main};
    -webkit-transition: 0.25s;
    transition: 0.25s;
    outline: none;
  }
`;
const StyledSelect = styled(Select)`
  width: 150px;
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  padding: 10px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  padding: 10px;
`;

const ListWrapper = styled.div`
  display: flex;
`;

export { WorkSchedule };
