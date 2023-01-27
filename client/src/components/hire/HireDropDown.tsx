import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useDetectClose from "../../util/useDetectClose";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../util/redux";
import {
  selectCategory,
  selectLocation,
  selectTag,
  resetTag,
} from "../../util/redux/DropDown";
import { useNavigate } from "react-router";
import Button from "../Buttons";

const tags = [
  "ALL",
  "재택근무🏠",
  "야간🌙",
  "초보자가능🐣",
  "최저시급💰",
  "당일지급💵",
  "능력활용🧐",
  "역세권🚇",
  "식사제공🍴",
  "경력1년이상💡",
];
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

const DropdownMenu = () => {
  const dispatch = useDispatch();
  //태그버튼 클릭시
  const [clickedTag, setClickedTag] = useState("");
  const [previousClickedTag, setPreviousClickedTag] = useState("");

  const selectedCategory = useSelector(
    (state: RootState) => state.DropDown.selectedCategory
  );
  const selectedLocation = useSelector(
    (state: RootState) => state.DropDown.selectedLocation
  );
  const selectedTag = useSelector(
    (state: RootState) => state.DropDown.selectedTag
  );
  //로그인 되어있다면 새글작성버튼 보이게
  const isLogin = useSelector((state: RootState) => state.LogIn.isLogIn);
  const [showNewHireButton, setShowNewHireButton] = useState(false);

  useEffect(() => {
    setShowNewHireButton(isLogin);
  }, [isLogin]);

  const handleCategoryClick = (category: string) => {
    dispatch(selectCategory(category));
    categoryHandler();
  };

  const handleLocationClick = (location: string) => {
    dispatch(selectLocation(location));
    locationHandler();
  };

  const handleTagClick = (tag: string) => {
    if (tag === "ALL") {
      setClickedTag("ALL");
      dispatch(resetTag());
      setPreviousClickedTag("ALL");
    } else if (tag !== previousClickedTag) {
      setClickedTag(tag);
      setPreviousClickedTag(tag);
      dispatch(selectTag(tag));
    }
  };

  const [categoryIsOpen, categoryRef, categoryHandler] = useDetectClose(false);
  const [locationIsOpen, locationRef, locationHandler] = useDetectClose(false);

  const navigate = useNavigate();
  const newHireClickHandler = () => {
    navigate("/newhire");
  };

  const TagButton = ({ tag }: { tag: string; onClick: () => void }) => (
    <span className="tag">
      <button
        className={tag === clickedTag ? "clicked" : ""}
        onClick={() => handleTagClick(tag)}
      >
        {tag}
      </button>
    </span>
  );

  return (
    <>
      <UpperWrapper>
        <SelectSection>
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
        </SelectSection>
        <ButtonSection>
          {isLogin && (
            <Button
              onClick={newHireClickHandler}
              width={"100px"}
              color={"#6F38C5"}
            >
              게시글 작성
            </Button>
          )}
        </ButtonSection>
      </UpperWrapper>
      <LowerWrapper>
        <TagWrapper>
          <div>
            {tags.map((tag, index) => (
              <TagButton
                key={index}
                tag={tag}
                onClick={() => handleTagClick(selectedTag)}
              />
            ))}
          </div>
        </TagWrapper>
        <FilterButton>
          <div>
            <button>조회순</button>
            <button>보수높은순</button>
            <button>최신순</button>
          </div>
        </FilterButton>
      </LowerWrapper>
    </>
  );
};

//카테고리파트
const UpperWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 80px 120px 15px 120px;
  border-bottom: 1px solid #dadbdc;
`;

const SelectSection = styled.div`
  display: flex;
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: 80px;
`;

const DropdownContainer = styled.div`
  margin: 8px 50px 8px 50px;
  text-align: center;
  position: relative;
  flex: 0 1 auto;
  max-width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 34px;
  padding: 8px;
  background-color: white;
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
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

//태그 파트
const LowerWrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 20px 120px 15px 120px;
  border-bottom: 1px solid #dadbdc;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  margin-left: 30px;
  border: none;
  background-color: white;
  button {
    margin: 0 0.3rem 0 0;
    height: 1.5rem;
    font-size: 14px;
    font-weight: regular;
    color: #6f38c5;
    background-color: white;
    border: solid 1.2px #6f38c5;
    border-radius: 4px;
  }
  .clicked {
    background-color: #6f38c5;
    color: white;
  }
`;

const FilterButton = styled.div`
  height: 38px;
  float: right;
  border: none;
  cursor: pointer;
  font-size: 16px;
  button {
    margin: 0 0.3rem 0 0;
    height: 1.5rem;
    font-size: 14px;
    font-weight: regular;
    color: #6f38c5;
    background-color: white;
    width: 90px;
    border: solid 1.2px #6f38c5;
    border-radius: 4px;
  }
`;

export default DropdownMenu;
