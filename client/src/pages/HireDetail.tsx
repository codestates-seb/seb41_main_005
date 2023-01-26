import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import CalloutBox from "../components/detail/CalloutBox";
import UserInfo from "../components/detail/UserInfo";
import Warning from "../components/detail/Warning";
import { getDetailData } from "../api/getDetail";
import { getMemberData } from "../api/getMember";
import { hireDetailProps } from "../util/hireDetailData";
import { useSelector } from "react-redux";
import { RootState } from "../util/redux";

const Container = styled.div`
  display: block;
  max-width: 1060px;
  .wrapper {
    padding-top: 80px;
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
  const [datas, setDatas] = useState<hireDetailProps>();
  const [memberData, setMemberData] = useState();

  const navigate = useNavigate();
  const contentId = useParams().content_id;
  const memberId = datas?.memberId;
  const isLogIn = useSelector((state: RootState) => state.LogIn.isLogIn);
  const applicantId = useSelector((state: RootState) => state.LogIn.logInMID);

  useEffect(() => {
    const detail = async () => {
      const data = await getDetailData(Number(contentId));
      setDatas(data);
    };
    const member = async () => {
      const data = await getMemberData(memberId);
      setMemberData(data);
    };
    detail();
    member();
  }, [contentId, memberId]);

  const handleEditButton = () => {
    navigate("/edithire");
  };

  const handleWriteButton = () => {
    if (isLogIn) {
      navigate("/newhire");
    } else {
      alert("로그인 후 이용하세요.");
      navigate("/login");
    }
  };

  const handleApplyButton = () => {
    if (memberId !== applicantId) {
      axios
        .post(
          `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}/apply`,
          { applicantId }
        )
        .then((res) => console.log(res.data));
    } else {
      alert("본인이 작성한 게시글에는 지원할 수 없습니다.");
    }
  };

  return (
    <Container>
      {datas && (
        <div className="wrapper">
          <div className="left">
            <section className="header">
              <div className="title">
                <p>{datas.title}</p>
                {memberId === applicantId ? (
                  <button onClick={handleEditButton}>수정하기</button>
                ) : (
                  <button onClick={handleWriteButton}>게시글 작성</button>
                )}
              </div>
              <div className="tags">
                <ul>
                  {datas.contentTags
                    ? datas.contentTags.map((tag, idx) => (
                        <li key={idx}>{tag.tagName}</li>
                      ))
                    : (datas.contentTags = [])}
                </ul>
                <button>수정버튼</button>
              </div>
            </section>
            <section className="description">
              <div>
                <span>모집 인원</span>
                <p>{datas.recruitingCount}명</p>
              </div>
              <div>
                <span>업무 내용</span>
                <p>{datas.workContent}</p>
              </div>
              <div>
                <span>자격 요건</span>
                <p>{datas.qualification}</p>
              </div>
              <div>
                <span>우대 사항</span>
                <p>{datas.preference}</p>
              </div>
              <div>
                <span>기타</span>
                <p>{datas.other}</p>
              </div>
            </section>
            <UserInfo data={memberData} />
            <Warning nickName={datas.nickName} />
          </div>
          <div className="right">
            <CalloutBox
              data={datas}
              isLogin={isLogIn}
              handlebutton={handleApplyButton}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default HireDetail;
