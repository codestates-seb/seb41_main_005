import React, { useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import styled from "styled-components";
import { WorkSchedule } from "../components/TimeSelect";
import {
  LocationContainer,
  CategoryContainer,
} from "../components/CategoryLocation";
import axios from 'axios'

const NewHire = () => {
  const [title, setTitle] = useState("");
  const [workDetail, setWorkDetail] = useState("");
  const [volume, setVolume] = useState("");
  const [pay, setPay] = useState("");
  const [qualification, setQualification] = useState("");
  const [preferential, setPreferential] = useState("");
  const [etc, setEtc] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [workTime, setWorkTime] = useState([]);

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

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(event.target.value);
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPay(event.target.value);
  };

  const handleQualificationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQualification(event.target.value);
  };

  const handlePreferentialChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPreferential(event.target.value);
  };

  const handleEtcChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEtc(event.target.value);
  };

  const handleSubmit = () => {
    axios.post("http://gigker.iptime.org:8080/contents", {
      title: title,
      recruting_count: volume,
      work_content: workDetail,
      qualification: qualification,
      preference: preferential,
      other: etc,
      worktime: workTime,
      price: pay,
      location: location,
      category: category,
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
    console.log("새글제출");
  };

  return (
    <EditHireContainer>
      <TitleContainer>
        제목
        <InputBox
          width="400px"
          onChange={handleTitleChange}
        />
        카테고리
        <CategoryContainer value={category} onChange={handleCategoryChange} />
      </TitleContainer>
      <WithTitle>
        업무시간
        <WorkSchedule value={workTime} onChange={handleWorkTimeChange} />
      </WithTitle>
      <ThreeInput>
        <WithTitle>
          모집인원
          <InputBox
            width="165px"
            onChange={handleVolumeChange}
          />
        </WithTitle>
        <WithTitle>
          보수
          <InputBox
            width="165px"
            onChange={handlePayChange}
          />
        </WithTitle>
        <WithTitle>
          장소
          <LocationContainer value={location} onChange={handleLocationChange} />
        </WithTitle>
      </ThreeInput>
      <WithTitle>
        업무내용
        <InputBox
          width="600px"
          onChange={handleWorkDetailChange}
        />
      </WithTitle>
      <WithTitle>
        자격요건
        <InputBox
          width="600px"
          onChange={handleQualificationChange}
        />
      </WithTitle>
      <WithTitle>
        우대사항 (선택)
        <InputBox
          width="600px"
          onChange={handlePreferentialChange}
        />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <InputBox
          width="600px"
          onChange={handleEtcChange}
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
const ThreeInput = styled.div`
  display: flex;
  flex-direction: row;
`;
export default NewHire;
