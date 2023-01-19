import React, { useEffect, useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import styled from "styled-components";
import { WorkSchedule } from "../components/TimeSelect";
import {
  LocationContainer,
  CategoryContainer,
} from "../components/CateLocaTag";
import axios from "axios";

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

const EditHire = (props: Props) => {
  const { existingData } = props;
  const [title, setTitle] = useState(existingData ? existingData.title : "");
  const [workDetail, setWorkDetail] = useState(
    existingData ? existingData.workDetail : ""
  );
  const [volume, setVolume] = useState(existingData ? existingData.volume : "");
  const [pay, setPay] = useState(existingData ? existingData.pay : "");
  const [qualification, setQualification] = useState(
    existingData ? existingData.qualification : ""
  );
  const [preferential, setPreferential] = useState(
    existingData ? existingData.preferential : ""
  );
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

  useEffect(() => {
    axios
      .get("/contents/:id")
      .then((response) => {
        setExistingInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    axios
      .post("/contents", {
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
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <CategoryContainer value={existingInfo.category} />
      </TitleContainer>
      <WithTitle>
        업무시간
        <WorkSchedule value={existingInfo.workTime} />
      </WithTitle>
      <ThreeInput>
        <WithTitle>
          모집인원
          <InputBox
            width="165px"
            onChange={handleVolumeChange}
            value={existingInfo.volume}
          />
        </WithTitle>
        <WithTitle>
          보수
          <InputBox
            width="165px"
            onChange={handlePayChange}
            value={existingInfo.pay}
          />
        </WithTitle>
        <WithTitle>
          장소
          <LocationContainer value={existingInfo.location} />
        </WithTitle>
      </ThreeInput>
      <WithTitle>
        업무내용
        <InputBox
          width="600px"
          onChange={handleWorkDetailChange}
          value={existingInfo.workDetail}
        />
      </WithTitle>
      <WithTitle>
        자격요건
        <InputBox
          width="600px"
          onChange={handleQualificationChange}
          value={existingInfo.qualification}
        />
      </WithTitle>
      <WithTitle>
        우대사항 (선택)
        <InputBox
          width="600px"
          onChange={handlePreferentialChange}
          value={existingInfo.preferential}
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
  input {
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
