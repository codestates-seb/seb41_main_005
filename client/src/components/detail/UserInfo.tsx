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
      padding-right: 60px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .like {
          padding-right: 5px;
        }
        .dislike {
          padding-left: 5px;
        }
        hr {
          border-right: solid 1px #a9a9a9;
          border-bottom: 0px;
          width: 0px;
          height: 16px;
        }
      }
      .review {
        padding-left: 70px;
        padding-right: 10px;
      }
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

export default function UserInfo({
  data,
  handlebutton,
}: {
  data: any;
  handlebutton: any;
}) {
  return (
    <Container>
      <div className="profile">
        <img src={data.pictureUrl} alt="profile-img" />
        <div className="block">
          <div>
            <span className="title">닉네임</span>
            <span>{data.nickName}</span>
          </div>
          <div className="reputation">
            <span className="title">평판</span>
            <div>
              <span className="like">좋아요 {data.likeCount} </span>
              <hr />
              <span className="dislike">싫어요 {data.dislikeCount}</span>
            </div>
            <span className="title review">리뷰</span>
            <span>{data.reviewCount}</span>
          </div>
        </div>
      </div>
      <Button color={"#6F38C5"} width={"120px"} onClick={() => handlebutton()}>
        상세보기
      </Button>
    </Container>
  );
}
