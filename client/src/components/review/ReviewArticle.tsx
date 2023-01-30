import React from "react";
import styled from "styled-components";

const ReviewArticle = ({ datas }: { datas: Array<any> }) => {
  return (
    <ReviewArticleContainer>
      {datas.map((data, index) => (
        <Card key={index}>
          <CardHeader>
            <div>
              <span className="title">작성자</span>
              <span>{data.anonymous ? "익명" : data.nickName}</span>
            </div>
            <span className="liketype">
              {data.likeType === "LIKE" ? "👍좋아요" : "👎싫어요"}
            </span>
          </CardHeader>
          <hr />
          <CardContent>{data.comment}</CardContent>
        </Card>
      ))}
    </ReviewArticleContainer>
  );
};

const ReviewArticleContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 720px;
  hr {
    border-line: solid 0.5px #a9a9a9;
    margin-left: 20px;
    width: 640px;
  }
`;
const Card = styled.div`
  display: block;
  vertical-align: top;
  border: solid 1px #ccc;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #ccc;
  padding: 10px;
  margin: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  flew-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
  font-size: 18px;
  font-weight: medium;
  line-height: 1.4;
  width: 680px;
  div {
    display: flex;
    justify-content: space-between;
  }
  .title {
    color: #6667ab;
    padding-right: 10px;
  }
  .liketype {
    padding: 0px;
  }
`;

const CardContent = styled.div`
  display: block;
  font-size: 16px;
  line-height: 1.4;
  padding: 10px 20px 10px 20px;
`;

export default ReviewArticle;
