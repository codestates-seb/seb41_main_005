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

interface ExistingData {
  title: string;
  cityName: string;
  contentTags: Array<{
    tagName: string;
  }>;
  price: number;
  workTimes: Array<{
    startWorkTime: string;
    endWorkTime: string;
  }>;
  categoryName: string;
  workContent: string;
  recruitingCount: number;
  other: string;
  preference: string;
  qualification: string;
  deadLine: string;
}

interface WorkSchedule {
  startWorkTime: string;
  endWorkTime: string;
}

interface Props {
  existingData?: ExistingData;
}

const EditHire = (props: Props) => {
  const { existingData } = props;
  const navigate = useNavigate();
  const contentId = useParams().content_id;
  const [title, setTitle] = useState(existingData ? existingData.title : "");
  const [workDetail, setWorkDetail] = useState(
    existingData ? existingData.workContent : ""
  );
  const [volume, setVolume] = useState(existingData?.recruitingCount || 0);
  const [pay, setPay] = useState(existingData?.price || 0);
  const [qualification, setQualification] = useState(
    existingData ? existingData.qualification : ""
  );
  const [preferential, setPreferential] = useState(
    existingData ? existingData.preference : ""
  );
  const [etc, setEtc] = useState(existingData ? existingData.other : "");
  const [location, setLocation] = useState(
    existingData ? existingData.cityName : ""
  );
  const [category, setCategory] = useState(
    existingData ? existingData.categoryName : ""
  );
  const [workTime, setWorkTime] = useState<any>([]);
  const [tag, setTag] = useState("");
  const [deadline, setDeadline] = useState(
    existingData ? existingData.deadLine : ""
  );
  const [existingInfo, setExistingInfo] = useState<ExistingData>(
    Object.assign(
      {
        title: existingData?.title || "",
        categoryName: existingData?.categoryName || "",
        workTimes: existingData?.workTimes || [],
        recruitingCount: existingData?.recruitingCount || 0,
        price: existingData?.price || 0,
        cityName: existingData?.cityName || "",
        workContent: existingData?.workContent || "",
        qualification: existingData?.qualification || "",
        preference: existingData?.preference || "",
        other: existingData?.other || "",
        contentTags: existingData?.contentTags || [],
        deadLine: existingData?.deadLine || "",
      },
      existingData ?? {}
    )
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
    setTag(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExistingInfo({ ...existingInfo, title: event.target.value });
    setTitle(event.target.value);
  };

  const handleWorkDetailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExistingInfo({ ...existingInfo, workContent: event.target.value });
    setWorkDetail(event.target.value);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!Number(inputValue) || Number(inputValue) < 0) {
      event.preventDefault();
      alert("숫자만 입력 가능하고, 음수는 입력할 수 없습니다.");
    }
    setExistingInfo({
      ...existingInfo,
      recruitingCount: parseInt(event.target.value),
    });
    setVolume(parseInt(event.target.value));
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

  const handleQualificationChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExistingInfo({ ...existingInfo, qualification: event.target.value });
    setQualification(event.target.value);
  };

  const handlePreferentialChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExistingInfo({ ...existingInfo, preference: event.target.value });
    setPreferential(event.target.value);
  };

  const handleEtcChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExistingInfo({ ...existingInfo, other: event.target.value });
    setEtc(event.target.value);
  };

  const handleWorkTimeChange = (workTime: WorkSchedule[]) => {
    setWorkTime(workTime);
  };
  const handleDeadlineChange = (deadline: string) => {
    setDeadline(deadline);
  };
  const validateForm = () => {
    if (!location || !category || !tag || !workTime || !deadline) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert(
        "지원마감일, 카테고리, 태그, 업무시간, 지역 창을 반드시 입력해주세요."
      );
      return;
    }
    const updatedData = {
      ...existingInfo,
      title: title,
      contentType: "BUY",
      recruitingCount: volume,
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
      price: pay,
      cityName: location,
      other: etc,
      isPremium: false,
      deadLine: deadline,
    };

    axios
      .patch(
        `http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}`,
        existingInfo
      )
      .then((response) => {
        console.log(response);
        navigate(`/hireDetail/${contentId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    const result = confirm("정말 삭제 하시겠습니까?");
    if (result) {
      axios
        .delete(
          `http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}`
        )
        .then((response) => {
          alert("삭제 되었습니다");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/hire");
    }
  };

  return (
    <EditHireContainer>
      <TitleContainer>
        <InputSection>
          <label htmlFor="title">제목</label>
          <InputBox
            width="400px"
            id="title"
            value={existingInfo.title}
            onChange={handleTitleChange}
          />
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
          <InputBox
            value={existingInfo.recruitingCount}
            width="150px"
            onChange={handleVolumeChange}
            id={"num"}
          />
        </InputSection>
        <InputSection>
          <label htmlFor="income">보수</label>
          <InputBox
            value={existingInfo.price}
            width="150px"
            onChange={handlePayChange}
            id={"income"}
          />
        </InputSection>
        <InputSection>
          <label htmlFor="location">지역</label>
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
      </ThreeInput>
      <WithTitle>
        <label htmlFor="content">업무내용</label>
        <TextArea
          value={existingInfo.workContent}
          onChange={handleWorkDetailChange}
          id={"content"}
        />
      </WithTitle>
      <WithTitle>
        <label htmlFor="qualification">자격요건</label>
        <TextArea
          value={existingInfo.qualification}
          onChange={handleQualificationChange}
          id={"qualification"}
        />
      </WithTitle>
      <WithTitle>
        <label htmlFor="prefer">우대사항 (선택)</label>
        <TextArea
          value={existingInfo.preference}
          onChange={handlePreferentialChange}
          id={"prefer"}
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
const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  .edithunting-submit {
    margin-left: 30px;
    width: 150px;
    background-color: #6f38c5;
    &:hover {
      background-color: #fcc72c;
      transition: all 0.5s;
    }
  }
`;
export default EditHire;
