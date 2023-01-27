import React, { useState, useEffect } from "react";
import { CardProps, ServerData } from "./CardProps";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../util/redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const mapDataToCardProps = (data: ServerData): CardProps => {
  return {
    contentId: data.contentId,
    title: data.title,
    nickName: data.nickName,
    price: data.price,
    workTimes: data.workTimes,
    memberId: data.memberId,
    location: data.cityName,
    categories: data.categoryName,
    tag: data.contentTags[0].tagName,
  };
};

const HuntingArticle: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const navigate = useNavigate();

  const handleClick = (contentId: number) => {
    navigate(`/huntingDetail/${contentId}`);
  };

  useEffect(() => {
    const getData = async (contentType: string) => {
      try {
        const response = await axios.get(
          "http://ec2-43-201-27-162.ap-northeast-2.compute.amazonaws.com:8080/contents",
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
            (!selectedTag || card.tag === selectedTag)
        );

  return (
    <HuntingArticleContainer>
      {filteredCards.map((card, index) => (
        <Card key={index} onClick={() => handleClick(card.contentId)}>
          <CardTitle>{card.title}</CardTitle>
          <CardWriter>
            <span className="sub-title">작성자</span> {card.nickName}
          </CardWriter>
          <CardPay>
            <span className="sub-title">보수</span> {card.price}
          </CardPay>
          {card.workTimes && (
            <>
              <CardStart>
                <span className="sub-title">시작시간</span>
                {new Date(card.workTimes[0].startWorkTime).toLocaleString(
                  "ko-KR",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                )}
              </CardStart>
              <CardEnd>
                <span className="sub-title">종료시간</span>
                {new Date(card.workTimes[0].endWorkTime).toLocaleString(
                  "ko-KR",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                )}
              </CardEnd>
            </>
          )}
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
  width: 230px;
  height: 150px;
  border: 1px solid #ccc;
  margin: 10px;
  padding-bottom: 10px;
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
  .sub-title {
    color: #6667ab;
    padding-right: 5px;
  }
`;

const CardPay = styled.div`
  font-size: 14px;
  text-align: left;
  word-spacing: 2px;
  padding-left: 10px;
  .sub-title {
    color: #6667ab;
    padding-right: 5px;
  }
`;

const CardStart = styled.div`
  font-size: 14px;
  word-spacing: 2px;
  padding-left: 10px;
  .sub-title {
    color: #6667ab;
    padding-right: 5px;
  }
`;

const CardEnd = styled.div`
  font-size: 14px;
  word-spacing: 2px;
  padding-left: 10px;
  .sub-title {
    color: #6667ab;
    padding-right: 5px;
  }
`;

export default HuntingArticle;
