import React from "react";
import styled from "styled-components";
import useDetectClose from "../../util/useDetectClose";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../util/store";
import { selectCategory, selectLocation } from "../../util/types";
import { useNavigate } from "react-router";

const category = [
  "카테고리",
  "외식/음료",
  "매장관리/판매",
  "서비스",
  "사무직",
  "고객상담/영업",
  "생산/건설/노무",
  "IT/기술",
  "디자인",
  "미디어",
  "유통/물류",
  "병원/간호/연구",
  "교육/강사",
  "기타",
];
const location = [
  "지역",
  "종로구",
  "중구",
  "용산구",
  "성동구",
  "광진구",
  "동대문구",
  "중랑구",
  "성북구",
  "강북구",
  "도봉구",
  "노원구",
  "은평구",
  "서대문구",
  "마포구",
  "양천구",
  "강서구",
  "구로구",
  "금천구",
  "영등포구",
  "동작구",
  "관악구",
  "서초구",
  "강남구",
  "송파구",
  "강동구",
];

const DropdownT = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory
  );
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation
  );

  const handleCategoryClick = (category: string) => {
    dispatch(selectCategory(category));
    categoryHandler();
  };

  const handleLocationClick = (location: string) => {
    dispatch(selectLocation(location));
    locationHandler();
  };

  const [categoryIsOpen, categoryRef, categoryHandler] = useDetectClose(false);
  const [locationIsOpen, locationRef, locationHandler] = useDetectClose(false);

  const navigate = useNavigate();
  const newHuntingClickHandler = () => {
    navigate("/newhunting");
    console.log("새 글 작성");
  };

  return (
    <>
      <UpperWrapper>
        <DropdownContainer>
          <DropdownWrapper onClick={categoryHandler} ref={categoryRef}>
            <span>{selectedCategory}</span>
          </DropdownWrapper>
          <DropdownTitle isDropped={categoryIsOpen}>
            <DropdownList>
              {category.map((category: string) => (
                <DropdownItem key={category}>
                  <LinkWrapper onClick={() => handleCategoryClick(category)}>
                    {category}
                  </LinkWrapper>
                </DropdownItem>
              ))}
            </DropdownList>
          </DropdownTitle>
        </DropdownContainer>

        <DropdownContainer>
          <DropdownWrapper onClick={locationHandler} ref={locationRef}>
            <span>{selectedLocation}</span>
          </DropdownWrapper>
          <DropdownTitle isDropped={locationIsOpen}>
            <DropdownList>
              {location.map((location: string) => (
                <DropdownItem key={location}>
                  <LinkWrapper onClick={() => handleLocationClick(location)}>
                    {location}
                  </LinkWrapper>
                </DropdownItem>
              ))}
            </DropdownList>
          </DropdownTitle>
        </DropdownContainer>

        <AddHire onClick={newHuntingClickHandler}>
          <button>게시글 작성</button>
        </AddHire>
      </UpperWrapper>
    </>
  );
};

//카테고리파트
const UpperWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 70px 20px 15px 20px;
  border-bottom: 1px solid #dadbdc;
`;

const DropdownContainer = styled.div`
  margin: 16px 50px 0 50px;
  position: relative;
  text-align: center;
  flex: 0 1 auto;
  max-width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 38px;
  padding: 8px;
  background-color: white;
`;

const DropdownWrapper = styled.div`
  cursor: pointer;
`;

interface DropProps {
  isDropped: boolean;
}

const DropdownTitle = styled.div<DropProps>`
  background: gray;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 130px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
    isDropped &&
    `
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const DropdownList = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DropdownItem = styled.li``;

const LinkWrapper = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: white;
`;

const AddHire = styled.div`
  height: 38px;
  margin: 16px 15px 0 auto;
  padding: 9px 50px 8px;
  cursor: pointer;
  font-size: 16px;
`;

export default DropdownT;
