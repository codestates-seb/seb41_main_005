import Button from "../Buttons";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin: 10px 5px 10px 5px;
  padding: 20px;
  border: 1px solid #a9a9a9;
  border-radius: 2px;
  .profile {
    display: flex;
    flex-direction: row;
  }
  img {
    width: 55px;
    height: 55px;
    border-radius: 50px;
  }
  .block {
    display: block;
    margin-left: 10px;
    line-height: 28px;
    .reputation {
      margin-right: 60px;
    }
  }
  .title {
    color: #6667ab;
    padding-right: 10px;
  }
  Button {
    margin-right: 0px;
  }
`;

export default function UserInfo({ data }: { data: any }) {
  return (
    <Container>
      <div className="profile">
        <img src={data.pictureUrl} alt="profile-img" />
        <div className="block">
          <div>
            <span className="title">닉네임</span>
            <span>{data.nickName}</span>
          </div>
          <div>
            <span className="title">평판</span>
            <span className="reputation">
              좋아요 {data.totalLikeCount} | 싫어요 {data.totalDislikeCount}
            </span>
            <span className="title">리뷰</span>
            <span>{data.totalReviewCount}</span>
          </div>
        </div>
      </div>
      <Button color={"#6F38C5"} width={"120px"}>
        상세보기
      </Button>
    </Container>
  );
}
