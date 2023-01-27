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
    setExistingInfo({
      ...existingInfo,
      recruitingCount: parseInt(event.target.value),
    });
    setVolume(parseInt(event.target.value));
  };

  const handlePayChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}`,
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
    navigate("/hire");
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
const SubmitWrapper = styled.div`
  .edithunting-submit {
    margin: 30px;
    width: 200px;
  }
`;
export default EditHire;
