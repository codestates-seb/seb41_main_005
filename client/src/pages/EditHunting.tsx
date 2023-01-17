import React, { useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import styled from "styled-components";
import { WorkSchedule } from "../components/TimeSelect";
import {
  LocationContainer,
  CategoryContainer,
} from "../components/CategoryLocation";
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

const EditHunting = () => {
  const [title, setTitle] = useState("");
  const [workDetail, setWorkDetail] = useState("");
  const [pay, setPay] = useState("");
  const [etc, setEtc] = useState("");
  const [existingData, setExistingData] = useState<ExistingData>({
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
          value={existingData.title}
        />
        카테고리
        <CategoryContainer value={existingData.category} />
      </TitleContainer>
      <WithTitle>
        희망 업무시간
        <WorkSchedule value={existingData.workTime} />
      </WithTitle>
      <TwoInput>
        <WithTitle>
          희망보수
          <InputBox
            width="165px"
            onChange={handlePayChange}
            value={existingData.pay}
          />
        </WithTitle>
        <WithTitle>
          희망장소
          <LocationContainer value={existingData.location} />
        </WithTitle>
      </TwoInput>
      <WithTitle>
        업무내용
        <InputBox
          width="600px"
          onChange={handleWorkDetailChange}
          value={existingData.workDetail}
        />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <InputBox
          width="600px"
          onChange={handleEtcChange}
          value={existingData.etc}
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
export default EditHunting;
