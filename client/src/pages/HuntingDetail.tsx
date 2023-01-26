import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import CalloutBox from "../components/detail/CalloutBox";
import UserInfo from "../components/detail/UserInfo";
import Warning from "../components/detail/Warning";
import { getDetailData } from "../api/getDetail";
import { getMemberData } from "../api/getMember";
import { huntingDetailProps } from "../util/huntingDetailData";

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

function HuntingDetail() {
  const [isLogin, setIsLogin] = useState(true);
  const [datas, setDatas] = useState<huntingDetailProps>();
  const [memberData, setMemberData] = useState();

  const navigate = useNavigate();
  const contentId = useParams().content_id;
  const memberId = datas?.memberId;

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
    navigate("/edithunting");
  };

  const handleApplyButton = () => {
    axios({
      url: `http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents/${contentId}/apply`,
      data: {
        memberId: memberId,
        contentId: contentId,
      },
    }).then((res) => console.log(res.data));
  };

  return (
    <Container>
      {datas && (
        <div className="wrapper">
          <div className="left">
            <section className="header">
              <div className="title">
                <p>{datas.title}</p>
                <button onClick={handleEditButton}>게시글 작성</button>
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
            <UserInfo data={memberData} />
            <Warning nickName={datas.nickName} />
          </div>
          <div className="right">
            <CalloutBox
              data={datas}
              isLogin={isLogin}
              handlebutton={handleApplyButton}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default HuntingDetail;
