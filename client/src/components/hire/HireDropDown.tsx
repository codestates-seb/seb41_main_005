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
  "์ฌํ๊ทผ๋ฌด๐ ",
  "์ผ๊ฐ๐",
  "์ด๋ณด์๊ฐ๋ฅ๐ฃ",
  "์ต์ ์๊ธ๐ฐ",
  "๋น์ผ์ง๊ธ๐ต",
  "๋ฅ๋ ฅํ์ฉ๐ง",
  "์ญ์ธ๊ถ๐",
  "์์ฌ์ ๊ณต๐ด",
  "๊ฒฝ๋ ฅ1๋์ด์๐ก",
];
const category = [
  "์นดํ๊ณ ๋ฆฌ",
  "์ธ์/์๋ฃ",
  "๋งค์ฅ๊ด๋ฆฌ/ํ๋งค",
  "์๋น์ค",
  "์ฌ๋ฌด์ง",
  "๊ณ ๊ฐ์๋ด/์์",
  "์์ฐ/๊ฑด์ค/๋ธ๋ฌด",
  "IT/๊ธฐ์ ",
  "๋์์ธ",
  "๋ฏธ๋์ด",
  "์ ํต/๋ฌผ๋ฅ",
  "๋ณ์/๊ฐํธ/์ฐ๊ตฌ",
  "๊ต์ก/๊ฐ์ฌ",
  "๊ธฐํ",
];
const location = [
  "์ง์ญ",
  "์ข๋ก๊ตฌ",
  "์ค๊ตฌ",
  "์ฉ์ฐ๊ตฌ",
  "์ฑ๋๊ตฌ",
  "๊ด์ง๊ตฌ",
  "๋๋๋ฌธ๊ตฌ",
  "์ค๋๊ตฌ",
  "์ฑ๋ถ๊ตฌ",
  "๊ฐ๋ถ๊ตฌ",
  "๋๋ด๊ตฌ",
  "๋ธ์๊ตฌ",
  "์ํ๊ตฌ",
  "์๋๋ฌธ๊ตฌ",
  "๋งํฌ๊ตฌ",
  "์์ฒ๊ตฌ",
  "๊ฐ์๊ตฌ",
  "๊ตฌ๋ก๊ตฌ",
  "๊ธ์ฒ๊ตฌ",
  "์๋ฑํฌ๊ตฌ",
  "๋์๊ตฌ",
  "๊ด์๊ตฌ",
  "์์ด๊ตฌ",
  "๊ฐ๋จ๊ตฌ",
  "์กํ๊ตฌ",
  "๊ฐ๋๊ตฌ",
];

const DropdownH = () => {
  const dispatch = useDispatch();
  //ํ๊ทธ๋ฒํผ ํด๋ฆญ์
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
  //๋ก๊ทธ์ธ ๋์ด์๋ค๋ฉด ์๊ธ์์ฑ๋ฒํผ ๋ณด์ด๊ฒ
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
              ๊ฒ์๊ธ ์์ฑ
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
      </LowerWrapper>
    </>
  );
};

//์นดํ๊ณ ๋ฆฌํํธ
const UpperWrapper = styled.div`
  max-width: 1060px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 80px 0 15px 0;
  margin: auto;
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
  margin: 8px 20px 8px 0;
  text-align: center;
  position: relative;
  flex: 0 1 auto;
  width: 120px;
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
  justify-content: center;
`;

interface DropProps {
  isDropped: boolean;
}

const DropdownTitle = styled.div<DropProps>`
  background: #6667ab;
  position: absolute;
  top: 52px;
  left: 50%;
  height: 300px;
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
    top: -5px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: #6667ab;
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
    padding: 5px 0;
    &:hover {
      background-color: ${(props) => props.theme.color.main};
      transition: all 0.5s;
    }
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: #a9a9a9;
    border-radius: 0 3px 3px 0;
  }
  overflow-y: scroll;
  list-style-type: none;
  border-radius: 3px;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DropdownItem = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LinkWrapper = styled.a`
  width: 100%;
  font-size: 16px;
  text-decoration: none;
  color: white;
`;

//ํ๊ทธ ํํธ
const LowerWrapper = styled.div`
  max-width: 1060px;
  height: auto;
  margin: auto;
  padding: 15px 0;
  border-bottom: 1px solid #dadbdc;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 500px;
  margin: 8px;
  border: none;
  background-color: white;
  button {
    margin: 4px 8px 4px 0;
    padding: 2px 5px;
    height: auto;
    font-size: 14px;
    font-weight: regular;
    color: #444444;
    background-color: white;
    border: solid 1px #fcc72c;
    border-radius: 10px;
    &:hover {
      background-color: ${(props) => props.theme.color.main};
      transition: all 0.5s;
      color: white;
    }
  }
  .clicked {
    background-color: #fcc72c;
    color: white;
  }
`;

export default DropdownH;
