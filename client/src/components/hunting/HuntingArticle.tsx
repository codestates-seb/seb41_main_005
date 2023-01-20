import React, { useState, useEffect } from "react";
import { CardProps, ServerData } from "./CardProps";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../util/redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const mapDataToCardProps = (data: ServerData): CardProps => {
  return {
    title: data.title,
    nickName: data.nickName,
    price: data.price,
    workTimes: {
      startWorkTime:
        data.workTimes && data.workTimes.length > 0
          ? data.workTimes[0].startWorkTime
          : null,
      endWorkTime:
        data.workTimes && data.workTimes.length > 0
          ? data.workTimes[1].endWorkTime
          : null,
    },
    memberId: data.memberId,
    location: data.location,
    categories: data.category,
    tag: "Unknown",
  };
};

const HuntingArticle: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    const getData = async (contentType: string) => {
      try {
        const response = await axios.get(
          "http://gigker.iptime.org:8080/contents",
          {
            params: {
              contentType: contentType,
            },
          }
        );
        if (response.data.data) {
          setCards(response.data.data.map(mapDataToCardProps));
        } else {
          console.log("Data is undefined or null, cannot map to CardProps.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData("SELL");
  }, []);

  const navigate = useNavigate();
  const HandleClick = () => {
    navigate("/huntingdetail");
  };

  const selectedCategory = useSelector(
    (state: RootState) => state.DropDown.selectedCategory
  );
  const selectedLocation = useSelector(
    (state: RootState) => state.DropDown.selectedLocation
  );
  const selectedTag = useSelector(
    (state: RootState) => state.DropDown.selectedTag
  );
  const filteredCards =
    selectedCategory === "카테고리" &&
    selectedLocation === "지역" &&
    selectedTag === ""
      ? cards
      : cards.filter(
          (card) =>
            (selectedCategory === "카테고리" ||
              card.categories === selectedCategory) &&
            (selectedLocation === "지역" ||
              card.location === selectedLocation) &&
            (selectedTag === "" || card.tag === selectedTag)
        );
  return (
    <HuntingArticleContainer>
      {filteredCards.map((card, index) => (
        <Card key={index} onClick={HandleClick}>
          <CardTitle>{card.title}</CardTitle>
          <CardWriter>작성자 {card.nickName}</CardWriter>
          <CardPay>보수 {card.price}</CardPay>
          <CardStart>{card.workTimes.startWorkTime}</CardStart>
          <CardEnd>{card.workTimes.endWorkTime}</CardEnd>
        </Card>
      ))}
    </HuntingArticleContainer>
  );
};

const HuntingArticleContainer = styled.div`
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
  cursor: pointer;
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
  }
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

export default HuntingArticle;
