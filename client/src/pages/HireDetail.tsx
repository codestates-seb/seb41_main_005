import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CalloutBox from "../components/detail/CalloutBox";
import UserInfo from "../components/detail/UserInfo";
import Warning from "../components/detail/Warning";

const Container = styled.div`
  display: block;
  max-width: 1060px;
  .wrapper {
    margin-top: 80px;
    line-height: 20px;
    position: relative;
    .left {
      vertical-align: top;
      width: 700px;
      .header {
        border-bottom: 1px solid #a9a9a9;
        padding: 0px 0px 0px 5px;
        .title {
          display: flex;
          text-align: left;
          justify-content: space-between;
          font-size: 24px;
          font-weight: bold;
          p {
            padding-top: 8px;
          }
          button {
            margin: 0 0.5rem;
            height: 2.5rem;
            font-size: 16px;
            font-weight: regular;
            color: #6f38c5;
            background-color: white;
            width: 120px;
            border: solid 1.2px #6f38c5;
            border-radius: 4px;
          }
        }
        .tags {
          display: flex;
          font-size: 14px;
          margin: 0px 0px 10px;
          ul {
            flex-direction: row;
          }
          li {
            list-style: none !important;
            display: inline-block;
            margin: 4px;
          }
        }
      }
      .description {
        div {
          margin: 20px 5px 30px 5px;
        }
        span {
          font-size: 18px;
          font-weight: medium;
        }
        p {
          font-size: 16px;
          margin-top: 5px;
        }
      }
    }
    .right {
      position: fixed;
      right: 260px;
      top: 80px;
    }
  }
`;

function HireDetail() {
  const data = {
    type: "buy",
    nickname: "느낌오조",
    worktime: ["1월 22일 11:00 ~ 18:00"],
    location: "강남구",
    price: "100,000",
    status: "좋아요 3 | 싫어요 0",
    review_count: 10,
    title: "설날 배송 알바 구합니다",
    tags: ["#초보자가능", "#방학알바"],
    recruiting_count: 0,
    work_content: "설날 서울, 경기권 배송 업무",
    qualification: "1종 보통 면허 소지자",
    preference: "다마스, 라보, 승합차, 1톤 탑차, 냉동 탑차 소유자",
    other:
      "자세한 궁금한 사항은 전화 연락 바랍니다. 평일이나 주말에도 일이 많으니 관심있으신 분들은 지원해주세요.",
  };
  const nickname = data.nickname;

  const [isLogin, setIsLogin] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const navigate = useNavigate();

  const HandleEditButton = () => {
    isLogin ? navigate("/edithire") : console.log("login 필수");
  };

  const HandleApplyButton = () => {
    isDisable ? console.log("disabled") : console.log("clicked");
    setIsDisable(!isDisable);
  };

  return (
    <Container>
      hire detail page
      <div className="wrapper">
        <div className="left">
          <section className="header">
            <div className="title">
              <p>{data.title}</p>
              <button onClick={HandleEditButton}>게시글 작성</button>
            </div>
            <div className="tags">
              <ul>
                {data.tags
                  ? data.tags.map((tag, idx) => <li key={idx}>{tag}</li>)
                  : (data.tags = [])}
              </ul>
            </div>
          </section>
          <section className="description">
            <div>
              <span>모집 인원</span>
              <p>{data.recruiting_count}명</p>
            </div>
            <div>
              <span>업무 내용</span>
              <p>{data.work_content}</p>
            </div>
            <div>
              <span>자격 요건</span>
              <p>{data.qualification}</p>
            </div>
            <div>
              <span>우대 사항</span>
              <p>{data.preference}</p>
            </div>
            <div>
              <span>기타</span>
              <p>{data.other}</p>
            </div>
          </section>
          <UserInfo data={data} />
          <Warning nickname={nickname} />
        </div>
        <div className="right">
          <CalloutBox
            data={data}
            isDisable={isDisable}
            handlebutton={HandleApplyButton}
          />
        </div>
      </div>
    </Container>
  );
}

export default HireDetail;
