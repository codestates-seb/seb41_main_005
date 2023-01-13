import React from "react";
import { CardProps } from "./CardProps";
import styled from 'styled-components';
// import HireArticleContainer from "./HireArticleContainer";
//import { Link } from "react-router-dom";

export const cards: CardProps[] = [
  {
    title: `배달 알바 구합니다.`,
    nickname: `느낌오조`,
    price: `6만원`,
    startWorkTime: `2023.1.25 11:00`,
    endWorkTime: `2023.1.25 18:00`,
    memberId: `1`,
  },
  {
    title: `애견시설 알바 구합니다.`,
    nickname: `애견맘`,
    price: `8만원`,
    startWorkTime: `2023.2.2 9:00`,
    endWorkTime: `2023.2.2 15:00`,
    memberId: `2`,
  },
  {
    title: "아이 돌봄 알바 구합니다.",
    nickname: "아빠오조",
    price: "7만원",
    startWorkTime: "2023.2.10 14:00",
    endWorkTime: "2023.2.10 19:00",
    memberId: `3`,
  },
  {
    title: `강아지 돌봄 알바 구합니다.`,
    nickname: `집사오조`,
    price: `7만원`,
    startWorkTime: `2023.2.15 14:00`,
    endWorkTime: `2023.2.15 19:00`,
    memberId: `4`,
  },
  {
    title: `강아지 돌봄 알바 구합니다.`,
    nickname: `집사오조`,
    price: `7만원`,
    startWorkTime: `2023.2.15 14:00`,
    endWorkTime: `2023.2.15 19:00`,
    memberId: `5`,
  },
];

const HireArticle: React.FC<CardProps> = ({ cardData }) => {
  return (
    <HireArticleContainer>
      {cardData.map((data, index) => (
      <Card key={index}>
        <CardTitle>{data.title}</CardTitle>
        <CardWriter>작성자 {data.nickname}</CardWriter>
        <CardPay>보수 {data.price}</CardPay>
        <CardStart>{data.startWorkTime}</CardStart>
        <CardEnd>{data.endWorkTime}</CardEnd>
      </Card>
      ))}
    </HireArticleContainer>
  );
};
// <Link to ={`/contents/${content-id}`}>{title}</Link>

const HireArticleContainer = styled.div`
margin-top: 30px;
width: 80%;
display: flex;
`;

const Card = styled.div`
width: 250px;
height: 120px;
border: 1px solid #ccc;
margin: 5px;
display: flex;
flex-direction: row;
justify-content: flex-start;
flex-wrap: wrap;
text-overflow: ellipsis;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  padding-top: 15px;
  padding-left: 10px;
  :after {
    content: "";
    display: flex;
    margin-left: 10px;
    margin-top: 10px;
    width: 200px;
    border-bottom: 1px solid #ccc;
`;

const CardWriter = styled.div`
  font-size: 14px;
  text-align: left;
  word-spacing: 2px;
  padding-left: 10px;
`;

const CardPay = styled.div`
  font-size: 14px;
  text-align: left;
  word-spacing: 2px;
  padding-left: 10px;
`;

const CardStart = styled.div`
  font-size: 14px;
  word-spacing: 2px;
  padding-right: 5px;
  padding-left: 10px;
  padding-bottom: 5px;
`;

const CardEnd = styled.div`
  font-size: 14px;
  word-spacing: 2px;
  padding-bottom: 5px;
`;

export default HireArticle;
