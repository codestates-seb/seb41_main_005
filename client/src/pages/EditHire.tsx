import React, { useEffect, useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import TextArea from "../components/TextArea";
import styled from "styled-components";
import { useParams } from "react-router-dom";
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
  const contentId = useParams().content_id;
  const [title, setTitle] = useState(existingData ? existingData.title : "");
  const [workDetail, setWorkDetail] = useState(
    existingData ? existingData.workContent : ""
  );
  const [volume, setVolume] = useState(
    existingData ? existingData.recruitingCount : ""
  );
  const [pay, setPay] = useState(existingData ? existingData.price : "");
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
        title: "",
        categoryName: "",
        workTimes: [],
        recruitingCount: 0,
        price: 0,
        cityName: "",
        workContent: "",
        qualification: "",
        preference: "",
        other: "",
        contentTags: [],
        deadLine: "",
      },
      existingData
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
      .patch(
        `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}`,
        {
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
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = () => {
    axios
      .delete(
        `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}`
      )
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
          defaultValue={existingInfo.title}
        />
        지원마감일
        <Deadline onChange={handleDeadlineChange} />
      </TitleContainer>
      카테고리
      <CategoryWrapper>
        <select placeholder={"카테고리"} onChange={handleCategoryChange}>
          {categoryOptions.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              selected={value === existingInfo.categoryName}
            >
              {label}
            </option>
          ))}
        </select>
      </CategoryWrapper>
      태그
      <TagWrapper>
        <select placeholder={"태그"} onChange={handleTagChange}>
          {tagOptions.map(({ value, label }) => (
            <option key={value}>{label}</option>
          ))}
        </select>
      </TagWrapper>
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
          <InputBox
            width="165px"
            onChange={handleVolumeChange}
            value={existingInfo.recruitingCount}
          />
        </WithTitle>
        <WithTitle>
          보수
          <InputBox
            width="165px"
            onChange={handlePayChange}
            value={existingInfo.price}
          />
        </WithTitle>
        <WithTitle>
          장소
          <LocationWrapper>
            <select placeholder={"지역"} onChange={handleLocationChange}>
              {locationOptions.map(({ value, label }) => (
                <option key={value} selected={value === existingInfo.cityName}>
                  {label}
                </option>
              ))}
            </select>
          </LocationWrapper>
        </WithTitle>
      </ThreeInput>
      <WithTitle>
        업무내용
        <TextArea
          onChange={handleWorkDetailChange}
          defaultValue={existingInfo.workContent}
        />
      </WithTitle>
      <WithTitle>
        자격요건
        <TextArea
          onChange={handleQualificationChange}
          defaultValue={existingInfo.qualification}
        />
      </WithTitle>
      <WithTitle>
        우대사항 (선택)
        <TextArea
          onChange={handlePreferentialChange}
          defaultValue={existingInfo.preference}
        />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <TextArea
          onChange={handleEtcChange}
          defaultValue={existingInfo.other}
        />
      </WithTitle>
      <Button onClick={handleSubmit}>제출하기</Button>
      <Button onClick={handleDelete}>삭제하기</Button>
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
  margin: 10px;
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
export default EditHire;
