import HuntingArticle from "../components/hunting/HuntingArticle";
import HuntingDropDown from "../components/hunting/HuntingDropDown";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px;
`;

function Hunting() {
  return (
    <div className="Hunting">
      <Wrapper>
        <HuntingDropDown />
        <HuntingArticle />
      </Wrapper>
    </div>
  );
}

export default Hunting;
