import styled from "styled-components";

const ReviewInfo = ({ datas }: { datas: any }) => {
  return (
    <ReviewInfoContainer>
      <Image>
        <img src={datas.pictureUrl} alt="" />
      </Image>
      <Info>
        <div>
          <span className="title">닉네임</span>
          <span>{datas.nickName}</span>
        </div>
        <ReviewScore>
          <span className="title">평판</span>
          <div>
            <span className="like">좋아요 {datas.likeCount}</span>
            <hr />
            <span className="dislike">싫어요 {datas.dislikeCount}</span>
          </div>
        </ReviewScore>
        <div>
          <span className="title">리뷰</span>
          <span>{datas.reviewCount}</span>
        </div>
      </Info>
    </ReviewInfoContainer>
  );
};

const ReviewInfoContainer = styled.div`
  background-color: #fff;
  width: 300px;
  font-size: 16px;
  border: solid 1px #ccc;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #ccc;
  padding: 15px 10px 15px 10px;
  margin: 20px 10px 10px 10px;
  line-height: 1.4;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-aroud;
`;

const Image = styled.div`
  padding: 10px;
  img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }
`;

const Info = styled.div`
  div {
    margin: 5px;
    .title {
      color: #6667ab;
      padding-right: 10px;
    }
  }
`;

const ReviewScore = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  jutify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: row;
    jutify-content: space-between;
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
`;

export default ReviewInfo;
