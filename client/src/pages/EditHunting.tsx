import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import TextArea from "../components/TextArea";
import styled from "styled-components";
import { WorkSchedule, Deadline } from "../components/TimeSelect";
import { getDetailData } from "../api/getDetail";
import axios from "axios";
import {
  categoryOptions,
  locationOptions,
  tagOptions,
} from "../components/CateLocaTag";
import { BASE_URL } from "../api/getUrl";

interface ExistingData {
  title: string;
  cityName: string;
  contentTags: { tagName: string }[];
  price: number;
  workTimes: { startWorkTime: string; endWorkTime: string }[];
  categoryName: string;
  workContent: string;
  other: string;
  deadLine: string;
}
interface Props {
  existingData?: ExistingData;
}
interface WorkSchedule {
  startWorkTime: string;
  endWorkTime: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
}
const EditHunting = (props: Props) => {
  const { existingData } = props;
  const navigate = useNavigate();
  const contentId = useParams().content_id;
  const [title, setTitle] = useState(existingData ? existingData.title : "");
  const [workDetail, setWorkDetail] = useState(
    existingData ? existingData.workContent : ""
  );
  const [pay, setPay] = useState(existingData?.price || 0);
  const [etc, setEtc] = useState(existingData ? existingData.other : "");
  const [location, setLocation] = useState(
    existingData ? existingData.cityName : ""
  );
  const [category, setCategory] = useState(
    existingData ? existingData.categoryName : ""
  );
  const [workTime, setWorkTime] = useState<any>([]);
  const [tag, setTag] = useState(existingData?.contentTags[0]?.tagName || "");
  const [deadline, setDeadline] = useState(
    existingData ? existingData.deadLine : ""
  );
  const [existingInfo, setExistingInfo] = useState<ExistingData>(
    existingData || {
      title: "",
      categoryName: "",
      workTimes: [],
      price: 0,
      cityName: "",
      workContent: "",
      other: "",
      contentTags: [],
      deadLine: "",
    }
  );
  useEffect(() => {
    const detail = async () => {
      const data = await getDetailData(Number(contentId));
      setExistingInfo(data);
    };
    detail();
  }, [contentId]);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setExistingInfo({ ...existingInfo, categoryName: event.target.value });
    setCategory(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setExistingInfo({ ...existingInfo, cityName: event.target.value });
    setLocation(event.target.value);
  };

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTag = event.target.value;
    if (existingInfo.contentTags[0].tagName !== newTag) {
      setExistingInfo({
        ...existingInfo,
        contentTags: [{ tagName: newTag }],
      });
    }
    setTag(newTag);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExistingInfo({ ...existingInfo, title: event.target.value });
    setTitle(event.target.value);
  };

  const handleWorkDetailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExistingInfo({ ...existingInfo, workContent: event.target.value });
    setWorkDetail(event.target.value);
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!Number(inputValue) || Number(inputValue) < 0) {
      event.preventDefault();
      alert("숫자만 입력 가능하고, 음수는 입력할 수 없습니다.");
    }
    setExistingInfo({
      ...existingInfo,
      price: parseFloat(event.target.value),
    });
    setPay(parseFloat(event.target.value));
  };

  const handleEtcChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExistingInfo({ ...existingInfo, other: event.target.value });
    setEtc(event.target.value);
  };

  const handleWorkTimeChange = (workTime: WorkSchedule[]) => {
    setExistingInfo({
      ...existingInfo,
      workTimes: workTime.map(
        (schedule: { startWorkTime: any; endWorkTime: any }) => {
          return {
            startWorkTime: schedule.startWorkTime,
            endWorkTime: schedule.endWorkTime,
          };
        }
      ),
    });
    setWorkTime(workTime);
  };
  const handleDeadlineChange = (deadline: string) => {
    setExistingInfo({ ...existingInfo, deadLine: deadline });
    setDeadline(deadline);
  };
  const validateForm = () => {
    if (!workTime || !deadline) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("지원마감일, 업무시간 창을 반드시 입력해주세요.");
      return;
    }
    // console.log("tag:", tag);
    // console.log("workTime:", workTime);
    axios
      .patch(`${BASE_URL}/contents/${contentId}`, existingInfo)
      .then((response) => {
        console.log(response);
        navigate(`/huntingDetail/${contentId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = () => {
    const result = confirm("정말 삭제 하시겠습니까?");
    if (result) {
      axios
        .delete(`${BASE_URL}/contents/${contentId}`)
        .then((response) => {
          alert("삭제 되었습니다");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/hunting");
    }
  };

  return (
    <EditHuntingContainer>
      <TitleContainer>
        <InputSection>
          <label htmlFor="title">제목</label>
          <InputBox
            value={existingInfo.title}
            width="400px"
            id="title"
            onChange={handleTitleChange}
          />
        </InputSection>
        <DeadLineSection>
          <label htmlFor="date">구직마감일</label>
          <Deadline onChange={handleDeadlineChange} />
        </DeadLineSection>
      </TitleContainer>
      <SelectContainer>
        <InputSection>
          <label htmlFor="category">카테고리</label>
          <CategoryWrapper>
            <select
              value={existingInfo.categoryName}
              onChange={handleCategoryChange}
              id={"category"}
            >
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
            <select
              value={
                existingInfo.contentTags && existingInfo.contentTags.length
                  ? existingInfo.contentTags[0].tagName
                  : ""
              }
              onChange={handleTagChange}
              id={"tag"}
            >
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
      <TwoInput>
        <InputSection>
          <label htmlFor="num">희망보수</label>
          <InputBox
            value={existingInfo.price}
            width="150px"
            onChange={handlePayChange}
            id={"num"}
          />
        </InputSection>
        <InputSection>
          <label htmlFor="location">희망장소</label>
          <LocationWrapper>
            <select
              value={existingInfo.cityName}
              onChange={handleLocationChange}
              id={"location"}
            >
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
      </TwoInput>
      <WithTitle>
        <label htmlFor="content">업무내용</label>
        <TextArea
          value={existingInfo.workContent}
          onChange={handleWorkDetailChange}
          id={"content"}
        />
      </WithTitle>
      <WithTitle>
        <label htmlFor="etc">기타 (선택)</label>
        <TextArea
          value={existingInfo.other}
          onChange={handleEtcChange}
          id={"etc"}
        />
      </WithTitle>
      <SubmitWrapper>
        <Button className="edithunting-submit" onClick={handleDelete}>
          삭제하기
        </Button>
        <Button className="edithunting-submit" onClick={handleSubmit}>
          수정하기
        </Button>
      </SubmitWrapper>
    </EditHuntingContainer>
  );
};

const EditHuntingContainer = styled.div`
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
const TwoInput = styled.div`
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
  justify-content: flex-end;
  .edithunting-submit {
    margin-left: 20px;
    width: 150px;
    background-color: #6f38c5;
    &:hover {
      background-color: #fcc72c;
      transition: all 0.5s;
    }
  }
`;
export default EditHunting;
