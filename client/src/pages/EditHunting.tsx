import React, { useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import styled from "styled-components";
import { WorkSchedule } from "../components/TimeSelect";
import { categoryOptions, locationOptions } from "../components/CateLocaTag";
// import axios from 'axios'

interface ExistingData {
  title: string;
  category: string;
  workTime: Array<{ startDate: Date; startTime: string; endTime: string }>;
  volume: string;
  pay: string;
  location: string;
  workDetail: string;
  qualification: string;
  preferential: string;
  etc: string;
}
interface Props {
  existingData?: ExistingData;
}
interface WorkSchedule {
  startWorkTime: string;
  endWorkTime: string;
}
const EditHunting = (props: Props) => {
  const { existingData } = props;
  const [title, setTitle] = useState(existingData ? existingData.title : "");
  const [workDetail, setWorkDetail] = useState(
    existingData ? existingData.workDetail : ""
  );
  const [pay, setPay] = useState(existingData ? existingData.pay : "");
  const [etc, setEtc] = useState(existingData ? existingData.etc : "");
  const [location, setLocation] = useState(
    existingData ? existingData.location : ""
  );
  const [category, setCategory] = useState(
    existingData ? existingData.category : ""
  );
  const [workTime, setWorkTime] = useState(
    existingData ? existingData.workTime : ""
  );
  const [existingInfo, setExistingInfo] = useState<ExistingData>({
    title: "",
    category: "",
    workTime: [],
    volume: "",
    pay: "",
    location: "",
    workDetail: "",
    qualification: "",
    preferential: "",
    etc: "",
  });

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    console.log("category:", event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
    console.log("location:", event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleWorkDetailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWorkDetail(event.target.value);
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPay(event.target.value);
  };

  const handleEtcChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEtc(event.target.value);
  };

  const handleWorkTimeChange = (workTime: WorkSchedule[]) => {
    setWorkTime(workTime);
    console.log("worktime:", workTime);
  };

  const handleSubmit = () => {
    // axios.post('/endpoint/${articleId}', {
    //   title: title,
    //   category: category,
    //   workTime: workTime
    // })
    // .then(response => {
    //   console.log(response)
    // })
    // .catch(error => {
    //   console.log(error)
    // });
  };

  return (
    <EditHireContainer>
      <TitleContainer>
        제목
        <InputBox
          width="400px"
          onChange={handleTitleChange}
          value={existingInfo.title}
        />
        카테고리
        <CategoryWrapper>
          <select placeholder={"카테고리"} onChange={handleCategoryChange}>
            {categoryOptions.map(({ value, label }) => (
              <option key={value} value={existingInfo.category}>
                {label}
              </option>
            ))}
          </select>
        </CategoryWrapper>
      </TitleContainer>
      <WithTitle>
        희망 업무시간
        <WorkSchedule
          workTime={workTime}
          onWorkTimeChange={handleWorkTimeChange}
        />
      </WithTitle>
      <TwoInput>
        <WithTitle>
          희망보수
          <InputBox
            width="165px"
            onChange={handlePayChange}
            value={existingInfo.pay}
          />
        </WithTitle>
        <WithTitle>
          희망장소
          <LocationWrapper>
            <select placeholder={"지역"} onChange={handleLocationChange}>
              {locationOptions.map(({ value, label }) => (
                <option key={value} value={existingInfo.location}>
                  {label}
                </option>
              ))}
            </select>
          </LocationWrapper>
        </WithTitle>
      </TwoInput>
      <WithTitle>
        업무내용
        <InputBox
          width="600px"
          onChange={handleWorkDetailChange}
          value={existingInfo.workDetail}
        />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <InputBox
          width="600px"
          onChange={handleEtcChange}
          value={existingInfo.etc}
        />
      </WithTitle>
      <Button onClick={handleSubmit}>제출하기</Button>
    </EditHireContainer>
  );
};

const EditHireContainer = styled.div`
  padding: 100px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  $ {InputBox} { 
    align-items: center;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const WithTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const TwoInput = styled.div`
  display: flex;
  flex-direction: row;
`;
const CategoryWrapper = styled.div`
  margin: 10px;
  padding: 10px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
  }
`;
const LocationWrapper = styled.div`
  width: 150px;
  margin: 10px;
  padding: 10px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
  }
`;
export default EditHunting;
