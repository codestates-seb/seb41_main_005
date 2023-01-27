import ReviewInfo from "../components/review/ReviewInfo";
import ReviewArticle from "../components/review/ReviewArticle";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  max-width: 1060px;
  margin: auto;
  .wrapper {
    padding-top: 80px;
    line-height: 20px;
    position: relative;
  }
`;

function Review() {
  return (
    <Container>
      <div className="wrapper">
        <ReviewArticle />
        <ReviewInfo />
      </div>
    </Container>
  );
}

export default Review;
