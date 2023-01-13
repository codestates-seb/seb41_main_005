import React, { useState } from "react";
import styled from "styled-components"
import useDetectClose from "../util/useDetectClose"

const tags = ['재택근무🏠', '야간🌙', '초보자가능🐣', '최저시급💰', '당일지급💵', '능력활용🧐', '역세권🚇', '식사제공🍴', '경력1년이상💡'];

const TagButton = ({tag}: {tag:string}) => (
  <button>{tag}</button>
)
const category = ['외식/음료', '매장관리/판매', '서비스', '사무직', '고객상담/리서치/영업', '생산/건설/노무', 'IT/기술', '디자인', '미디어', '유통/물류', '병원/간호/연구', '교육/강사', '기타'] 
const territory = ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구','강서구','구로구', '금천구', '영등포구', '동작구','관악구', '서초구','강남구', '송파구', '강동구']

const DropdownMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("유통/물류");
  const [selectedterritory, setSelectedTerritory] = useState("강남구")
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const [boardIsOpen, boardRef, boardHandler] = useDetectClose(false);

  const logoutClickHandler = () => {
    console.log("새 글 작성");
  };

  const handleCategoryClick = (category:string) => {
    setSelectedCategory(category);
    myPageHandler();
  }
  const handleTerritoryClick = (territory:string) => {
    setSelectedTerritory(territory);
    myPageHandler();
  }

  return (
    <>
      <UpperWrapper>
        <DropdownContainer>
          <DropdownButton onClick={myPageHandler} ref={myPageRef}>
            <span>{selectedCategory}</span>
          </DropdownButton>
          <Menu isDropped={myPageIsOpen}>
            <Ul>
              {category.map((category:string) => (
              <Li key={category}>
                <LinkWrapper href="#1-1" onClick={() => handleCategoryClick(category)}>{category}</LinkWrapper>
              </Li>
            ))}
            </Ul>
          </Menu>
        </DropdownContainer>

        <DropdownContainer>
          <DropdownButton onClick={boardHandler} ref={boardRef}>
            <span>{selectedterritory}</span>
          </DropdownButton>
          <Menu isDropped={boardIsOpen}>
            <Ul>
            {territory.map((territory:string) => (
              <Li key={territory}>
                <LinkWrapper href="#2-1" onClick={() => handleTerritoryClick(territory)}>{territory}</LinkWrapper>
              </Li>
            ))}
            </Ul>
          </Menu>
        </DropdownContainer>

        <AddHire onClick={logoutClickHandler}><button>게시글 작성</button></AddHire>
      </UpperWrapper>
      <LowerWrapper>
        <CategoryButton>
          <div>{tags.map(tag => <TagButton tag={tag} />)}</div>
        </CategoryButton>
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
  padding: 20px 20px 15px 20px;
  border-bottom: 1px solid #dadbdc;
  . {
    margin: 0px 0px 15px 0px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;    
  flex: 0 1 auto;
  max-width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 38px;
  padding: 8px;
  background-color: white;
  margin: 16px 8px 0;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  background: gray;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 100px;
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


const Ul = styled.ul`
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

const Li = styled.li``;

const LinkWrapper = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: white;
`;

const AddHire = styled.div`
  height: 38px;
  margin: 16px 15px 0 auto;
  padding: 9px 11px 8px;
  // border: 1px solid;
  cursor: pointer;
  font-size: 16px;
`;

//태그 파트
const LowerWrapper = styled.div`
width: 100%;
padding: 20px 20px 15px 20px;
border-bottom: 1px solid #dadbdc;
. {
  margin: 0px 0px 15px 0px;
}
`;

const CategoryButton = styled.div`
`;
const FilterButton = styled.div`
height: 38px;
margin: 16px 15px 0 auto;
padding: 9px 11px 8px;
border: 1px solid 
cursor: pointer;
font-size: 16px;
`;

export default DropdownMenu;

