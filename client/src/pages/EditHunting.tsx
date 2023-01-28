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
        price: existingData?.price || 0,
        cityName: existingData?.cityName || "",
        workContent: existingData?.workContent || "",
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

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        navigate(`/huntingDetail/${contentId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = () => {
    axios
      .delete(
        `http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/hunting");
  };

  return (
    <EditHireContainer>
      <TitleContainer>
        제목
        <InputBox
          width="350px"
          onChange={handleTitleChange}
          defaultValue={existingInfo.title}
        />
        지원마감일
        <Deadline onChange={handleDeadlineChange} />
      </TitleContainer>
      <SelectWrapper>
        <WithTitle>
          카테고리
          <CategoryWrapper>
            <select
              value={existingInfo.categoryName}
              placeholder={"카테고리"}
              onChange={handleCategoryChange}
            >
              {categoryOptions.map(({ value, label }) => (
                <option key={value}>{label}</option>
              ))}
            </select>
          </CategoryWrapper>
        </WithTitle>
        <WithTitle>
          태그
          <TagWrapper>
            <select placeholder={"태그"} onChange={handleTagChange}>
              {tagOptions.map(({ value, label }) => (
                <option key={value}>{label}</option>
              ))}
            </select>
          </TagWrapper>
        </WithTitle>
      </SelectWrapper>
      <WithTitle>
        희망 업무시간
        <WorkSchedule
          workTime={workTime}
          onWorkTimeChange={handleWorkTimeChange}
        />
      </WithTitle>
      <TwoInput>
        <WithTitle>
          희망보수
          <InputBox
            width="165px"
            onChange={handlePayChange}
            value={existingInfo.price}
          />
        </WithTitle>
        <WithTitle>
          희망장소
          <LocationWrapper>
            <select
              placeholder={"지역"}
              value={existingInfo.cityName}
              onChange={handleLocationChange}
            >
              {locationOptions.map(({ value, label }) => (
                <option key={value}>{label}</option>
              ))}
            </select>
          </LocationWrapper>
        </WithTitle>
      </TwoInput>
      <WithTitle>
        업무내용
        <TextArea
          onChange={handleWorkDetailChange}
          defaultValue={existingInfo.workContent}
        />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <TextArea
          onChange={handleEtcChange}
          defaultValue={existingInfo.other}
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
  width: 80%;
  margin: auto;
  padding: 135px;
  display: flex;
  flex-direction: column;
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
  justify-content: center;
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const CategoryWrapper = styled.div`
  padding: 10px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
  }
`;
const LocationWrapper = styled.div`
  width: 150px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
    margin: 7px;
  }
`;
const TagWrapper = styled.div`
  padding: 10px;
  select {
    width: 150px;
    height: 2.5rem;
    border-radius: 5px;
  }
`;
const SubmitWrapper = styled.div`
  .edithunting-submit {
    margin: 10px 50px 0 10px;
    width: 150px;
    float: right;
    background-color: #6f38c5;
    &:hover {
      background-color: #fcc72c;
      transition: all 0.5s;
    }
  }
`;
export default EditHunting;
