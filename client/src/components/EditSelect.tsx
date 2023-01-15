import Select from "react-select";
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import ko from 'date-fns/locale/ko';

//카테고리 컨테이너
const CategoryContainer = () => {
  const [category, setCategory] = useState("")

  const categoryOptions = [
    { value: "외식/음료", label: "외식/음료" },
    { value: "매장관리/판매", label: "매장관리/판매" },
    { value: "서비스", label: "서비스" },
    { value: "사무직", label: "사무직" },
    { value: "고객상담/영업", label: "고객상담/영업" },
    { value: "생산/건설/노무", label: "생산/건설/노무" },
    { value: "IT/기술", label: "IT/기술" },
    { value: "디자인", label: "디자인" },
    { value: "미디어", label: "미디어" },
    { value: "유통/물류", label: "유통/물류" },
    { value: "병원/간호/연구", label: "병원/간호/연구" },
    { value: "교육/강사", label: "교육/강사" },
    { value: "기타", label: "기타" },
  ]

  const handleCategoryChange = (selectedOption: any) => {
    setCategory(selectedOption.value);
  }

  return (
    <CategoryWrapper>
      <Select options={categoryOptions} onChange={handleCategoryChange} />
    </CategoryWrapper>
  )

}

// 업무시간 컨테이너
const WorkSchedule = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (selectedOption: any) => {
    setStartTime(selectedOption.value)
  }
  const handleEndTimeChange = (selectedOption: any) => {
    setEndTime(selectedOption.value)
  }

  // 시간 드롭다운
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      let value = `${("0" + hour).slice(-2)}:${("0" + minute).slice(-2)}`;
      let label = `${hour}:${("0" + minute).slice(-2)} ${hour < 12 ? "AM" : "PM"}`;
      timeOptions.push({ value, label });
    }
  }

  return (
    <TimeWrapper>
      날짜
      <div>
        <DatePicker selected={startDate}
          onChange={(date: unknown) => setStartDate(date as Date)}
          dateFormat="yyyy-MM-dd"
          locale={ko}
        />
      </div>
      시작시간
      < Select options={timeOptions} onChange={handleStartTimeChange} />
      종료시간
      < Select options={timeOptions} onChange={handleEndTimeChange} />
    </TimeWrapper >
  )
}

//장소컨테이너
const LocationContainer = () => {
  const [location, setLocation] = useState("")

  const locationOptions = [
    { value: "종로구", label: "종로구" },
    { value: "중구", label: "중구" },
    { value: "용산구", label: "용산구" },
    { value: "성동구", label: "성동구" },
    { value: "광진구", label: "광진구" },
    { value: "동대문구", label: "동대문구" },
    { value: "중랑구", label: "중랑구" },
    { value: "성북구", label: "성북구" },
    { value: "강북구", label: "강북구" },
    { value: "도봉구", label: "도봉구" },
    { value: "노원구", label: "노원구" },
    { value: "은평구", label: "은평구" },
    { value: "서대문구", label: "서대문구" },
    { value: "마포구", label: "마포구" },
    { value: "양천구", label: "양천구" },
    { value: "강서구", label: "강서구" },
    { value: "구로구", label: "구로구" },
    { value: "금천구", label: "금천구" },
    { value: "영등포구", label: "영등포구" },
    { value: "동작구", label: "동작구" },
    { value: "관악구", label: "관악구" },
    { value: "서초구", label: "서초구" },
    { value: "강남구", label: "강남구" },
    { value: "송파구", label: "송파구" },
    { value: "강동구", label: "강동구" },
  ]

  const handleLocationChange = (selectedOption: any) => {
    setLocation(selectedOption.value);
  }

  return (
    <LocationWrapper>
      <Select options={locationOptions} onChange={handleLocationChange} />
    </LocationWrapper>
  )
}

const CategoryWrapper = styled.div`
margin: 10px;
padding: 10px;
`

const TimeWrapper = styled.div`
display: flex;
flex-direction: row;
margin: 10px;
padding: 10px;
`;

const LocationWrapper = styled.div`
margin: 10px;
padding: 10px;
`;

export { WorkSchedule, LocationContainer, CategoryContainer };

