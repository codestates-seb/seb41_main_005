import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import TextArea from "../components/TextArea";
import styled from "styled-components";
import { WorkSchedule, Deadline } from "../components/TimeSelect";
import axios from "axios";
import {
  categoryOptions,
  locationOptions,
  tagOptions,
} from "../components/CateLocaTag";

interface WorkSchedule {
  startWorkTime: string;
  endWorkTime: string;
}

const NewHire = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [workDetail, setWorkDetail] = useState("");
  const [volume, setVolume] = useState("");
  const [pay, setPay] = useState("");
  const [qualification, setQualification] = useState("");
  const [preferential, setPreferential] = useState("");
  const [etc, setEtc] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [workTime, setWorkTime] = useState<any>([]);
  const [deadline, setDeadline] = useState("");

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    console.log("category:", event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
    console.log("location:", event.target.value);
  };

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTag(event.target.value);
    console.log("tag:", event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleWorkDetailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWorkDetail(event.target.value);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(event.target.value);
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPay(event.target.value);
  };

  const handleQualificationChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQualification(event.target.value);
  };

  const handlePreferentialChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPreferential(event.target.value);
  };

  const handleEtcChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEtc(event.target.value);
  };

  const handleWorkTimeChange = (workTime: WorkSchedule[]) => {
    setWorkTime(workTime);
  };

  const handleDeadlineChange = (deadline: string) => {
    setDeadline(deadline);
  };

  const handleSubmit = () => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }

    axios
      .post(
        "http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents",
        {
          title: title,
          contentType: "BUY",
          recruitingCount: parseInt(volume), // volume string을 int로
          workContent: workDetail,
          qualification: qualification,
          preference: preferential,
          categoryName: category,
          workTimes: workTime.map(
            (schedule: { startWorkTime: any; endWorkTime: any }) => {
              return {
                startWorkTime: schedule.startWorkTime,
                endWorkTime: schedule.endWorkTime,
              };
            }
          ),
          contentTags: [{ tagName: tag }],
          price: parseInt(pay), // pay string을 int로
          cityName: location,
          other: etc,
          isPremium: false,
          deadLine: deadline,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/hire");
  };

  return (
    <EditHireContainer>
      <TitleContainer>
        제목
        <InputBox width="350px" onChange={handleTitleChange} />
        지원마감일
        <Deadline onChange={handleDeadlineChange} />
      </TitleContainer>
      <SelectWrapper>
        카테고리
        <CategoryWrapper>
          <select onChange={handleCategoryChange}>
            <option defaultValue="" hidden>
              선택
            </option>
            {categoryOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </CategoryWrapper>
        태그
        <TagWrapper>
          <select onChange={handleTagChange}>
            <option defaultValue="" hidden>
              선택
            </option>
            {tagOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </TagWrapper>
      </SelectWrapper>
      <WithTitle>
        업무시간
        <WorkSchedule
          workTime={workTime}
          onWorkTimeChange={handleWorkTimeChange}
        />
      </WithTitle>
      <ThreeInput>
        <WithTitle>
          모집인원
          <InputBox width="165px" onChange={handleVolumeChange} />
        </WithTitle>
        <WithTitle>
          보수
          <InputBox width="165px" onChange={handlePayChange} />
        </WithTitle>

        <LocationWrapper>
          지역
          <select onChange={handleLocationChange}>
            <option defaultValue="" hidden>
              선택
            </option>
            {locationOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </LocationWrapper>
      </ThreeInput>
      <WithTitle>
        업무내용
        <TextArea onChange={handleWorkDetailChange} />
      </WithTitle>
      <WithTitle>
        자격요건
        <TextArea onChange={handleQualificationChange} />
      </WithTitle>
      <WithTitle>
        우대사항 (선택)
        <TextArea onChange={handlePreferentialChange} />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <TextArea onChange={handleEtcChange} />
      </WithTitle>
      <SubmitWrapper>
        <Button className="newhire-submit" onClick={handleSubmit}>
          제출하기
        </Button>
      </SubmitWrapper>
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
const SelectWrapper = styled.div`
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
  padding: 10px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
    margin: 7px;
  }
`;

const TagWrapper = styled.div`
  margin: 10px;
  padding: 10px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
  }
`;
const SubmitWrapper = styled.div`
  .newhire-submit {
    margin-left: 330px;
    width: 300px;
  }
`;
export default NewHire;
