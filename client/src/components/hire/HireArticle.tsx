import React from "react";
import { CardProps } from "./CardProps";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from "../../util/store"

//import { Link } from "react-router-dom";

export const cards: CardProps[] = [
  {
    title: `배달 알바 구합니다.`,
    nickname: `느낌오조`,
    price: `6만원`,
    startWorkTime: `2023.1.25 11:00`,
    endWorkTime: `2023.1.25 18:00`,
    memberId: `1`,
    location: `강남구`,
    categories: `유통/물류`,
    tag: `식사제공🍴`,
  },
  {
    title: `애견시설 알바 구합니다.`,
    nickname: `애견맘`,
    price: `8만원`,
    startWorkTime: `2023.2.2 9:00`,
    endWorkTime: `2023.2.2 15:00`,
    memberId: `2`,
    location: `용산구`,
    categories: `매장관리/판매`,
    tag: `초보자가능🐣`,
  },
  {
    title: "아이 돌봄 알바 구합니다.",
    nickname: "아빠오조",
    price: "7만원",
    startWorkTime: "2023.2.10 14:00",
    endWorkTime: "2023.2.10 19:00",
    memberId: `3`,
    location: `종로구`,
    categories: `기타`,
    tag: `능력활용🧐`,
  },
  {
    title: `강아지 돌봄 알바 구합니다.`,
    nickname: `집사오조`,
    price: `7만원`,
    startWorkTime: `2023.2.15 14:00`,
    endWorkTime: `2023.2.15 19:00`,
    memberId: `4`,
    location: `중랑구`,
    categories: `기타`,
    tag: `최저시급💰`,
  },
  {
    title: `카페 알바 구합니다.`,
    nickname: `집사오조`,
    price: `7만원`,
    startWorkTime: `2023.2.15 14:00`,
    endWorkTime: `2023.2.15 19:00`,
    memberId: `5`,
    location: `서대문구`,
    categories: `외식/음료`,
    tag: `역세권🚇`,
  },
];

const HireArticle: React.FC = () => {
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory)
  const selectedLocation = useSelector((state: RootState) => state.selectedLocation)
  const selectedTag = useSelector((state: RootState) => state.selectedTag)
  const filteredCards = 
  selectedCategory === "카테고리" && selectedLocation === "지역" && selectedTag === "" ? cards : 
  cards.filter(
    card => 
      (selectedCategory === "카테고리" || card.categories === selectedCategory) && 
      (selectedLocation === "지역" || card.location === selectedLocation) && 
      (selectedTag === "" || card.tag === selectedTag)
  );
  return (
    <HireArticleContainer>
      {filteredCards.map((card, index) => (
      <Card key={index}>
        <CardTitle>{card.title}</CardTitle>
        <CardWriter>작성자 {card.nickname}</CardWriter>
        <CardPay>보수 {card.price}</CardPay>
        <CardStart>{card.startWorkTime}</CardStart>
        <CardEnd>{card.endWorkTime}</CardEnd>
      </Card>
      ))}
    </HireArticleContainer>
  );
};
// <Link to ={`/contents/${content-id}`}>{title}</Link>

const HireArticleContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 60px;
  margin-right: 60px;
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
