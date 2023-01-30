import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import CalloutBox from "../components/detail/CalloutBox";
import UserInfo from "../components/detail/UserInfo";
import Warning from "../components/detail/Warning";
import { getDetailData } from "../api/getDetail";
import { getMemberData } from "../api/getMember";
import { huntingDetailProps } from "../util/huntingDetailData";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../util/redux";
import Button from "../components/Buttons";
import { setTabNum } from "../util/redux/LogIn";

const Container = styled.div`
  display: block;
  max-width: 1060px;
  margin: auto;
  min-height: 620px;
  .wrapper {
    padding: 100px 10px;
    line-height: 20px;
    position: relative;
    .left {
      display: inline-block;
      vertical-align: top;
      width: 700px;
      hr {
        border-line: solid 0.5px #a9a9a9;
        width: 680px;
      }
      .header {
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
            margin: 0 1.5rem;
            height: 2.5rem;
            font-size: 16px;
            font-weight: regular;
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
    @media (min-width: 1200px) {
      .left {
        display: inline-block;
        width: calc(100% - 360px);
        vertical-align: top;
      }
      .right {
        position: fixed;
        right: calc((100% - 1060px) / 2);
        top: 100px;
      }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      .right {
        width: 340px;
      }
    }
  }
`;

function HuntingDetail() {
  const [datas, setDatas] = useState<huntingDetailProps>();
  const contentId = useParams().content_id;
  const memberId = datas?.memberId;
  const reviewCount = datas?.reviewCount;
  const isLogIn = useSelector((state: RootState) => state.LogIn.isLogIn);
  const applicantId = useSelector((state: RootState) => state.LogIn.logInMID);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailAPI = useCallback(async () => {
    const data = await getDetailData(Number(contentId));
    setDatas(data);
  }, [contentId]);

  useEffect(() => {
    detailAPI();
  }, [detailAPI]);

  const handleEditButton = () => {
    navigate(`/edithunting/${contentId}`);
  };

  const handleWriteButton = () => {
    if (isLogIn) {
      navigate("/newhunting");
    } else {
      alert("로그인 후 이용하세요.");
      dispatch(setTabNum(4));
      navigate("/login");
    }
  };

  const handleDetailButton = () => {
    reviewCount !== 0
      ? navigate(`/review/${contentId}`)
      : alert("아직 작성된 리뷰가 없습니다.");
  };

  const handleApplyButton = () => {
    if (memberId !== applicantId) {
      axios
        .post(
          `http://ec2-3-39-239-42.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}/apply`,
          { applicantId }
        )
        .then((res) => console.log(res.data));
    } else {
      alert("본인이 작성한 게시글에는 지원할 수 없습니다.");
    }
  };

  return (
    <Container>
      {datas ? (
        <div className="wrapper">
          <div className="left">
            <section className="header">
              <div className="title">
                <p>{datas.title}</p>
                {memberId === applicantId ? (
                  <Button
                    onClick={handleEditButton}
                    width={"120px"}
                    color={"#6f38c5"}
                  >
                    수정하기
                  </Button>
                ) : (
                  <Button
                    onClick={handleWriteButton}
                    width={"120px"}
                    color={"#6f38c5"}
                  >
                    게시글 작성
                  </Button>
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
              </div>
              <hr />
            </section>
            <section className="description">
              <div>
                <span>업무 내용</span>
                <p>{datas.workContent}</p>
              </div>
              <div>
                <span>기타</span>
                <p>{datas.other}</p>
              </div>
            </section>
            <UserInfo data={datas} handlebutton={handleDetailButton} />
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
      ) : null}
    </Container>
  );
}

export default HuntingDetail;
