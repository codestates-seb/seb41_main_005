import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getReview } from "../../api/getReivew";

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
  // const [reviewData, setReviewData] = useState();
  // const contentId = useParams().content_id;

  // useEffect(() => {
  //   const review = async () => {
  //     const data = await getReview(Number(contentId));
  //     setReviewData(data);
  //   };
  //   review();
  // }, [contentId]);

  return (
    <ReviewInfoContainer>
      <Card>
        <CardNickname>
          <span className="title">작성자</span>
          <span>{ReviewInfoCard.nickname}</span>
        </CardNickname>
        <CardScore>
          <span className="title">평판</span>
          <span>
            좋아요 {ReviewInfoCard.like} | 싫어요 {ReviewInfoCard.dislike}
          </span>
        </CardScore>
        <CardCount>
          <span className="title">리뷰</span>
          <span>{ReviewInfoCard.reviewCount}</span>
        </CardCount>
      </Card>
    </ReviewInfoContainer>
  );
};

const ReviewInfoContainer = styled.div`
  margin-top: 30px;
  width: 300px;
  position: fixed;
  top: 10%;
  right: 20%;
`;
const Card = styled.div`
  border: solid 1px #ccc;
  box-shadow: 1px 1px 1px #ccc;
  padding: 10px;
  margin: 10px;
  span {
    padding-right: 10px;
  }
  .title {
    color: #6667ab;
  }
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
