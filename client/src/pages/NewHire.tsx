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
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTag(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleWorkDetailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWorkDetail(event.target.value);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!Number(inputValue) || Number(inputValue) < 0) {
      event.preventDefault();
      alert("숫자만 입력 가능하고, 음수는 입력할 수 없습니다.");
    }
    setVolume(event.target.value);
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!Number(inputValue) || Number(inputValue) < 0) {
      event.preventDefault();
      alert("숫자만 입력 가능하고, 음수는 입력할 수 없습니다.");
    }
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
  const validateForm = () => {
    if (
      !title ||
      !workDetail ||
      !volume ||
      !pay ||
      !qualification ||
      !location ||
      !category ||
      !tag ||
      !workTime ||
      !deadline
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("(선택)을 제외한 모든 창에 입력해주세요.");
      return;
    }
    axios
      .post(
        "https://api.gigker.shop:443/contents",
        {
          title: title,
          contentType: "BUY",
          recruitingCount: parseInt(volume),
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
          price: parseInt(pay),
          cityName: location,
          other: etc,
          isPremium: false,
          deadLine: deadline,
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/hire");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <EditHireContainer>
      <TitleContainer>
        <InputSection>
          <label htmlFor="title">제목</label>
          <InputBox width="400px" id="title" onChange={handleTitleChange} />
        </InputSection>
        <DeadLineSection>
          <label htmlFor="date">지원마감일</label>
          <Deadline onChange={handleDeadlineChange} />
        </DeadLineSection>
      </TitleContainer>
      <SelectContainer>
        <InputSection>
          <label htmlFor="category">카테고리</label>
          <CategoryWrapper>
            <select onChange={handleCategoryChange} id={"category"}>
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
        </InputSection>
        <InputSection>
          <label htmlFor="tag">태그</label>
          <TagWrapper>
            <select onChange={handleTagChange} id={"tag"}>
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
        </InputSection>
        <WorkSchedule
          workTime={workTime}
          onWorkTimeChange={handleWorkTimeChange}
        />
      </SelectContainer>
      <ThreeInput>
        <InputSection>
          <label htmlFor="num">모집인원</label>
          <InputBox width="150px" onChange={handleVolumeChange} id={"num"} />
        </InputSection>
        <InputSection>
          <label htmlFor="income">보수</label>
          <InputBox width="150px" onChange={handlePayChange} id={"income"} />
        </InputSection>

        <InputSection>
          <label htmlFor="location">지역</label>
          <LocationWrapper>
            <select onChange={handleLocationChange} id={"location"}>
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
        </InputSection>
      </ThreeInput>
      <WithTitle>
        <label htmlFor="content">업무내용</label>
        <TextArea onChange={handleWorkDetailChange} id={"content"} />
      </WithTitle>
      <WithTitle>
        <label htmlFor="qualification">자격요건</label>
        <TextArea onChange={handleQualificationChange} id={"qualification"} />
      </WithTitle>
      <WithTitle>
        <label htmlFor="prefer">우대사항 (선택)</label>
        <TextArea onChange={handlePreferentialChange} id={"prefer"} />
      </WithTitle>
      <WithTitle>
        <label htmlFor="etc">기타 (선택)</label>
        <TextArea onChange={handleEtcChange} id={"etc"} />
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
  background: #fafafa;
  max-width: 1060px;
  margin: auto;
  padding: 135px 190px 100px 150px;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const InputSection = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  label {
    margin-left: 1rem;
  }
`;
const DeadLineSection = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  margin-right: 19px;
  label {
    margin-left: 1rem;
  }
`;
const WithTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  label {
    margin-left: 1rem;
  }
`;
const ThreeInput = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;
const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CategoryWrapper = styled.div`
  margin: 8px 16px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
  }
`;
const LocationWrapper = styled.div`
  margin: 8px 16px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
  }
`;

const TagWrapper = styled.div`
  margin: 8px 16px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: right;
  margin: 32px 0;
  .newhire-submit {
    width: 300px;
    background-color: #6f38c5;
    &:hover {
      background-color: #fcc72c;
      transition: all 0.5s;
    }
  }
`;
export default NewHire;
