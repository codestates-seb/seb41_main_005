import styled from "styled-components";

const HireArticleContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-contents: flex-start;
  .card {
    width: 250px;
    height: 120px;
    border: 1px solid #ccc;
    margin: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card-title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    padding-top: 15px;
    padding-left: 10px;
    :after {
      content: "";
      display: block;
      margin-left: 10px;
      margin-top: 10px;
      width: 200px;
      border-bottom: 1px solid #ccc;
    }
  }
  .card-writer {
    font-size: 14px;
    text-align: left;
    word-spacing: 2px;
    padding-left: 10px;
  }
  .card-pay {
    font-size: 14px;
    text-align: left;
    word-spacing: 2px;
    padding-left: 10px;
  }
  .card-start {
    font-size: 14px;
    word-spacing: 2px;
    padding-right: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
  }
  .card-end {
    font-size: 14px;
    word-spacing: 2px;
    padding-bottom: 5px;
  }
`;

export default HireArticleContainer;
