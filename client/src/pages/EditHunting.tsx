import React, { useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import styled from "styled-components";
import {
  WorkSchedule,
  LocationContainer,
  CategoryContainer,
} from "../components/EditSelect";
// import axios from 'axios'

const EditHunting = () => {
  const [title, setTitle] = useState("");
  const [workDetail, setWorkDetail] = useState("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleWorkDetailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWorkDetail(event.target.value);
  };

  const handleSubmit = () => {
    // axios.post('/your-endpoint', {
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
        <InputBox width="400px" onChange={handleTitleChange} />
        카테고리
        <CategoryContainer />
      </TitleContainer>
      <WithTitle>
        희망 업무시간
        <WorkSchedule />
      </WithTitle>
      <TwoInput>
        <WithTitle>
          희망보수
          <InputBox width="165px" />
        </WithTitle>
        <WithTitle>
          희망장소
          <LocationContainer />
        </WithTitle>
      </TwoInput>
      <WithTitle>
        업무내용
        <InputBox width="600px" onChange={handleWorkDetailChange} />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <InputBox width="600px" />
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
