import React, { useEffect, useState, ChangeEvent } from "react";
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

const EditHire = () => {
  const [title, setTitle] = useState("");
  const [workDetail, setWorkDetail] = useState("");
  const [volume, setVolume] = useState("");
  const [pay, setPay] = useState("");
  const [qualification, setQualification] = useState("");
  const [preferential, setPreferential] = useState("");
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
  // const [articleId, setArticleId] = useState(props.match.params.id);

  // useEffect(() => {
  //   axios.get(`/endpoint/${articleId}`)
  //     .then((response) => {
  //       setExistingData(response.data);
  //       setTitle(response.data.title);
  //       setWorkDetail(response.data.workDetail);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

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
        업무시간
        <WorkSchedule value={existingData.workTime} />
      </WithTitle>
      <ThreeInput>
        <WithTitle>
          모집인원
          <InputBox
            width="165px"
            onChange={handleVolumeChange}
            value={existingData.volume}
          />
        </WithTitle>
        <WithTitle>
          보수
          <InputBox
            width="165px"
            onChange={handlePayChange}
            value={existingData.pay}
          />
        </WithTitle>
        <WithTitle>
          장소
          <LocationContainer value={existingData.location} />
        </WithTitle>
      </ThreeInput>
      <WithTitle>
        업무내용
        <InputBox
          width="600px"
          onChange={handleWorkDetailChange}
          value={existingData.workDetail}
        />
      </WithTitle>
      <WithTitle>
        자격요건
        <InputBox
          width="600px"
          onChange={handleQualificationChange}
          value={existingData.qualification}
        />
      </WithTitle>
      <WithTitle>
        우대사항 (선택)
        <InputBox
          width="600px"
          onChange={handlePreferentialChange}
          value={existingData.preferential}
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
const ThreeInput = styled.div`
  display: flex;
  flex-direction: row;
`;
export default EditHire;
