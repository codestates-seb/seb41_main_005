import React, { useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import TextArea from "../components/TextArea";
import styled from "styled-components";
import { WorkSchedule, Deadline } from "../components/TimeSelect";
import {
  categoryOptions,
  locationOptions,
  tagOptions,
} from "../components/CateLocaTag";
import axios from "axios";

interface WorkSchedule {
  startWorkTime: string;
  endWorkTime: string;
}

const EditHunting = () => {
  const [title, setTitle] = useState("");
  const [workDetail, setWorkDetail] = useState("");
  const [pay, setPay] = useState("");
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

  const handleWorkTimeChange = (workTime: WorkSchedule[]) => {
    setWorkTime(workTime);
    console.log("worktime:", workTime);
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleWorkDetailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWorkDetail(event.target.value);
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPay(event.target.value);
  };

  const handleEtcChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEtc(event.target.value);
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
          contentType: "SELL",
          workContent: workDetail,
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
  };

  return (
    <EditHuntingContainer>
      <TitleContainer>
        제목
        <InputBox width="350px" onChange={handleTitleChange} />
        지원마감일
        <Deadline onChange={handleDeadlineChange} />
      </TitleContainer>
      <SelectWrapper>
        카테고리
        <CategoryWrapper>
          <select placeholder={"카테고리"} onChange={handleCategoryChange}>
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
              태그
            </option>
            {tagOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </TagWrapper>
      </SelectWrapper>
      <PossibleTime>
        희망 업무시간
        <WorkSchedule
          workTime={workTime}
          onWorkTimeChange={handleWorkTimeChange}
        />
      </PossibleTime>
      <TwoInput>
        <WithTitle>
          희망보수
          <InputBox width="300px" onChange={handlePayChange} />
        </WithTitle>
        <WithTitle>
          희망장소
          <LocationWrapper>
            <select placeholder={"지역"} onChange={handleLocationChange}>
              {locationOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </LocationWrapper>
        </WithTitle>
      </TwoInput>
      <WithTitle>
        업무내용
        <TextArea onChange={handleWorkDetailChange} />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <TextArea onChange={handleEtcChange} />
      </WithTitle>
      <SubmitWrapper>
        <Button className="newhunting-submit" onClick={handleSubmit}>
          제출하기
        </Button>
      </SubmitWrapper>
    </EditHuntingContainer>
  );
};

const EditHuntingContainer = styled.div`
  padding: 100px 50px 50px 50px;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const PossibleTime = styled.div`
  margin-top: 10px;
  margin-left: 5px;
`;

const WithTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const TwoInput = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 50px;
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 70px;
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
  .newhunting-submit {
    margin-left: 330px;
    width: 300px;
  }
`;
export default EditHunting;
