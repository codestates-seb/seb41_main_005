import React, { useEffect, useState, ChangeEvent } from "react";
import InputBox from "../components/Input";
import Button from "../components/Buttons";
import TextArea from "../components/TextArea";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { WorkSchedule, Deadline } from "../components/TimeSelect";
import axios from "axios";
import {
  categoryOptions,
  locationOptions,
  tagOptions,
} from "../components/CateLocaTag";

interface ExistingData {
  title: string;
  category: string;
  workTime: Array<{
    startWorkTime: string;
    endWorkTime: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
  }>;
  volume: string;
  pay: string;
  location: string;
  workDetail: string;
  qualification: string;
  preferential: string;
  etc: string;
  tag: string;
  deadline: string;
}

interface Props {
  existingData?: ExistingData;
}
interface WorkSchedule {
  startWorkTime: string;
  endWorkTime: string;
}

const EditHire = (props: Props) => {
  const { existingData } = props;
  const { id } = useParams();
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
  const [workTime, setWorkTime] = useState<any>([
    existingData ? existingData.workTime : "",
  ]);
  const [tag, setTag] = useState(existingData ? existingData.tag : "");
  const [deadline, setDeadline] = useState(
    existingData ? existingData.deadline : ""
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
    tag: "",
    deadline: "",
  });

  useEffect(() => {
    axios
      .get(
        `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents/${id}`
      )
      .then((response) => {
        setExistingInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
    axios
      .patch(
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
        지원마감일
        <Deadline onChange={handleDeadlineChange} />
      </TitleContainer>
      카테고리
      <CategoryWrapper>
        <select placeholder={"카테고리"} onChange={handleCategoryChange}>
          {categoryOptions.map(({ value, label }) => (
            <option key={value} value={existingInfo.category}>
              {label}
            </option>
          ))}
        </select>
      </CategoryWrapper>
      태그
      <TagWrapper>
        <select placeholder={"태그"} onChange={handleTagChange}>
          {tagOptions.map(({ value, label }) => (
            <option key={value} value={existingInfo.tag}>
              {label}
            </option>
          ))}
        </select>
      </TagWrapper>
      <WithTitle>
        업무시간
        <WorkSchedule
          workTime={existingInfo.workTime}
          onWorkTimeChange={handleWorkTimeChange}
        />
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
          <LocationWrapper>
            <select placeholder={"지역"} onChange={handleLocationChange}>
              {locationOptions.map(({ value, label }) => (
                <option key={value} value={existingInfo.location}>
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
          value={existingInfo.workDetail}
        />
      </WithTitle>
      <WithTitle>
        자격요건
        <TextArea
          onChange={handleQualificationChange}
          value={existingInfo.qualification}
        />
      </WithTitle>
      <WithTitle>
        우대사항 (선택)
        <TextArea
          onChange={handlePreferentialChange}
          value={existingInfo.preferential}
        />
      </WithTitle>
      <WithTitle>
        기타 (선택)
        <TextArea onChange={handleEtcChange} value={existingInfo.etc} />
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
