import React, { useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import styled from "styled-components";
import { WorkSchedule } from "../components/TimeSelect";
import {
  LocationContainer,
  CategoryContainer,
} from "../components/CateLocaTag";
import axios from "axios";

const EditHunting = () => {
  const [title, setTitle] = useState("");
  const [workDetail, setWorkDetail] = useState("");
  const [pay, setPay] = useState("");
  const [etc, setEtc] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [workTime, setWorkTime] = useState<any>([]);

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleWorkTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWorkTime(event.target.value);
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

  const handleSubmit = () => {
    axios
      .post("http://gigker.iptime.org:8080/contents", {
        title: title,
        work_content: workDetail,
        other: etc,
        worktime: workTime,
        price: pay,
        location: location,
        category: category,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("새글제출");
  };

  return (
    <EditHireContainer>
      <TitleContainer>
        제목
        <InputBox width="400px" onChange={handleTitleChange} />
        카테고리
        <CategoryContainer value={category} onChange={handleCategoryChange} />
      </TitleContainer>
      <WithTitle>
        희망 업무시간
        <WorkSchedule value={workTime} onChange={handleWorkTimeChange} />
      </WithTitle>
      <TwoInput>
        <WithTitle>
          희망보수
          <InputBox width="165px" onChange={handlePayChange} />
        </WithTitle>
        <WithTitle>
          희망장소
          <LocationContainer value={location} onChange={handleLocationChange} />
        </WithTitle>
      </TwoInput>
      <WithTitle>
        업무내용
        <InputBox width="600px" onChange={handleWorkDetailChange} />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <InputBox width="600px" onChange={handleEtcChange} />
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
