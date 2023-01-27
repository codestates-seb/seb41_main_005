import Select from "react-select";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import ko from "date-fns/locale/ko";
import Button from "./Buttons";
interface Props {
  workTime: Array<{
    startWorkTime: string;
    endWorkTime: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
  }>;
  onWorkTimeChange?: (
    workTime: Array<{
      startWorkTime: string;
      endWorkTime: string;
      startDate: Date;
      startTime: string;
      endDate: Date;
      endTime: string;
    }>
  ) => void;
}

// 업무시간 컨테이너
const WorkSchedule: React.FC<Props> = ({ workTime, onWorkTimeChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [workSchedule, setWorkSchedule] = useState(workTime);

  const handleStartTimeChange = (selectedOption: any) => {
    setStartTime(selectedOption.value);
  };
  const handleEndTimeChange = (selectedOption: any) => {
    setEndTime(selectedOption.value);
  };
  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };
  const handleAddSchedule = () => {
    const startWorkTime = `${startDate
      .toISOString()
      .slice(0, 10)}T${startTime}:00`;
    const endWorkTime = `${endDate.toISOString().slice(0, 10)}T${endTime}:00`;
    const newSchedule = {
      startWorkTime: startWorkTime,
      endWorkTime: endWorkTime,
      startDate,
      startTime,
      endDate,
      endTime,
    };

    setWorkSchedule([...workSchedule, newSchedule]);

    // check if onWorkTimeChange prop is defined
    if (onWorkTimeChange) {
      onWorkTimeChange([...workTime, newSchedule]);
    }
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
        <div>
          시작
          <StyledDatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            locale={ko}
          />
          <StyledSelect
            placeholder={"시간"}
            options={timeOptions}
            onChange={handleStartTimeChange}
          />
        </div>
        <div>
          종료
          <StyledDatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            locale={ko}
          />
          <StyledSelect
            placeholder={"시간"}
            options={timeOptions}
            onChange={handleEndTimeChange}
          />
        </div>
        <ButtonWrapper>
          <Button className="worktime-submit" onClick={handleAddSchedule}>
            추가
          </Button>
        </ButtonWrapper>
      </SelectWrapper>
      <ListWrapper>
        {workSchedule.map((schedule, index) => (
          <div key={index}>
            {`${schedule.startWorkTime.slice(
              0,
              10
            )} ${schedule.startWorkTime.slice(11, 16)}`}
            ~
            {`${schedule.endWorkTime.slice(0, 10)} ${schedule.endWorkTime.slice(
              11,
              16
            )}`}
          </div>
        ))}
      </ListWrapper>
    </TimeContainer>
  );
};

interface DueDate {
  onChange: (deadline: string) => void;
}

const Deadline: React.FC<DueDate> = ({ onChange }) => {
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [deadlineTime, setDeadlineTime] = useState("");
  const [deadlineSum, setdeadlineSum] = useState("");

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const value = `${("0" + hour).slice(-2)}:${("0" + minute).slice(-2)}`;
      const label = `${hour}:${("0" + minute).slice(-2)}
      ${hour < 12 ? "AM" : "PM"}`;
      timeOptions.push({ value, label });
    }
  }

  const handledeadlineTimeChange = (selectedOption: any) => {
    setDeadlineTime(selectedOption.value);
  };
  const handledeadlineDateChange = (date: Date) => {
    setDeadlineDate(date);
  };
  const handleDeadline = () => {
    const deadline = `${deadlineDate
      .toISOString()
      .slice(0, 10)}T${deadlineTime}:00`;
    setdeadlineSum(deadline);
    onChange(deadline);
  };

  return (
    <DeadlineWrapper>
      <StyledDatePicker
        selected={deadlineDate}
        onChange={handledeadlineDateChange}
        dateFormat="yyyy-MM-dd"
        locale={ko}
      />
      <StyledSelect
        placeholder={"시간"}
        options={timeOptions}
        onChange={handledeadlineTimeChange}
      />
      <ButtonWrapper>
        <Button
          className="deadline-submit"
          onClick={() => {
            handleDeadline();
          }}
        >
          등록
        </Button>
      </ButtonWrapper>
      <SumWrapper>{deadlineSum}</SumWrapper>
    </DeadlineWrapper>
  );
};

const StyledDatePicker = styled(DatePicker)`
  width: 120px;
  height: 2.5rem;
  margin-top: 10px;
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
  width: 120px;
  font-size: 14px;
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
`;

const ListWrapper = styled.div`
  margin-left: -10px;
  margin-top: 30px;
`;

const SumWrapper = styled.div`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  .worktime-submit {
    width: 50px;
    margin-top: 65px;
    margin-left: -10px;
  }
  .deadline-submit {
    width: 50px;
    float: right;
    margin-top: -40px;
    margin-right: -60px;
  }
`;

const DeadlineWrapper = styled.div`
  margin: 10px;
`;

export { WorkSchedule, Deadline };
