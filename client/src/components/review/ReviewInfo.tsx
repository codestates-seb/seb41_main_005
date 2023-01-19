import React from "react";
import styled from "styled-components";

interface ReviewInfoCard {
  nickname: string;
  like: number;
  dislike: number;
  reviewCount: number;
}

export const ReviewInfoCard = {
  nickname: "(주)느낌오조",
  like: 5,
  dislike: 1,
  reviewCount: 14,
};

const ReviewInfo = () => {
  return (
    <ReviewInfoContainer>
      <Card>
        <CardNickname>작성자 {ReviewInfoCard.nickname}</CardNickname>
        <CardScore>
          평판 좋아요|{ReviewInfoCard.like} 싫어요|{ReviewInfoCard.dislike}
        </CardScore>
        <CardCount>리뷰 {ReviewInfoCard.reviewCount}</CardCount>
      </Card>
    </ReviewInfoContainer>
  );
};

const ReviewInfoContainer = styled.div`
  margin-top: 30px;
  width: 230px;
  position: fixed;
  top: 15%;
  right: 5%;
`;
const Card = styled.div`
  border: solid 1px #ccc;
  box-shadow: 1px 1px 1px #ccc;
  padding: 15px;
`;

const CardNickname = styled.div`
  padding: 5px;
`;

const CardScore = styled.div`
  padding: 5px;
`;

const CardCount = styled.div`
  padding: 5px;
`;

export default ReviewInfo;
