import ReviewInfo from "../components/review/ReviewInfo";
import ReviewArticle from "../components/review/ReviewArticle";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getReview } from "../api/getReivew";

const Container = styled.div`
  display: block;
  max-width: 1060px;
  margin: auto;
  min-height: 700px;
  .wrapper {
    padding-top: 80px;
    line-height: 20px;
    position: relative;
    .left {
      display: inline-block;
      vertical-align: top;
      width: 720px;
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
        top: 70px;
      }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      .right {
        width: 340px;
      }
    }
  }
`;

interface ReviewProps {
  data: Array<{
    writerNickName: string;
    reviewId: number;
    writerId: number;
    recipinetId: number;
    contentType: string;
    likeType: string;
    comment: string;
    secondComment: string;
    anonymous: boolean;
  }>;
  info: {
    dislikeCount: number;
    likeCount: number;
    memberId: number;
    nickName: string;
    pictureUrl: string;
    reviewCount: number;
  };
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

function Review() {
  const [reviewData, setReviewData] = useState<ReviewProps>();
  const contentId = useParams().content_id;

  const reviewAPI = useCallback(async () => {
    const data = await getReview(Number(contentId));
    setReviewData(data);
  }, [contentId]);

  useEffect(() => {
    reviewAPI();
  }, [reviewAPI]);

  return (
    <Container>
      {reviewData ? (
        <div className="wrapper">
          <div className="left">
            <ReviewArticle datas={reviewData.data} />
          </div>
          <div className="right">
            <ReviewInfo datas={reviewData.info} />
          </div>
        </div>
      ) : null}
    </Container>
  );
}

export default Review;
