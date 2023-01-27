import React from "react";
import styled from "styled-components";

interface ReviewArticleCard {
  nickname: string;
  reviewContent: string;
}

const reviewData: ReviewArticleCard[] = [
  {
    nickname: "네모네모스펀지밥",
    reviewContent:
      "첫 배달 알바였는데, 사장님이 업무를 자세히 알려주셔서 어렵지 않았습니다. 무엇보다 식사를 주셔서 든든하게 일할 수 있어요. 목장갑도 주십니다. 겨울에 갔던지라 핸드크림 필수! 목폴라 같이 보온되는 것 꼭 챙겨가세요. 체력적 어느정도 드는 일이라 그 부분은 감안하고 가시면 좋습니다.",
  },
  {
    nickname: "익명1",
    reviewContent:
      "첫 배달 알바였는데, 사장님이 업무를 자세히 알려주셔서 어렵지 않았습니다. 무엇보다 식사를 주셔서 든든하게 일할 수 있어요. 목장갑도 주십니다. 겨울에 갔던지라 핸드크림 필수! 목폴라 같이 보온되는 것 꼭 챙겨가세요. 체력적 어느정도 드는 일이라 그 부분은 감안하고 가시면 좋습니다.",
  },
  {
    nickname: "세모세모숲",
    reviewContent:
      "첫 배달 알바였는데, 사장님이 업무를 자세히 알려주셔서 어렵지 않았습니다. 무엇보다 식사를 주셔서 든든하게 일할 수 있어요. 목장갑도 주십니다. 겨울에 갔던지라 핸드크림 필수! 목폴라 같이 보온되는 것 꼭 챙겨가세요. 체력적 어느정도 드는 일이라 그 부분은 감안하고 가시면 좋습니다.",
  },
];

const ReviewArticle = () => {
  return (
    <ReviewArticleContainer>
      {reviewData.map((review, index) => (
        <Card key={index}>
          <CardNickname>
            <span className="title">작성자</span>
            <span>{review.nickname}</span>
          </CardNickname>
          <CardContent>{review.reviewContent}</CardContent>
        </Card>
      ))}
    </ReviewArticleContainer>
  );
};

const ReviewArticleContainer = styled.div`
  margin-top: 30px;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 60px;
  margin-right: 60px;
`;
const Card = styled.div`
  border: solid 1px #ccc;
  box-shadow: 1px 1px 1px #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const CardNickname = styled.div`
  padding: 10px;
  span {
    padding-right: 10px;
  }
  .title {
    color: #6667ab;
  }
  &:after {
    content: "";
    display: block;
    width: 100%;
    border-bottom: 1px solid #ccc;
    margin: 5px auto;
  }
`;

const CardContent = styled.div`
  padding: 0 10px 10px 10px;
`;

export default ReviewArticle;
