import HireArticle from "../components/hire/HireArticle";
import HireDropDown from "../components/hire/HireDropDown";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 40px;
`;

function Hire() {
  return (
    <div className="Hire">
      <Wrapper>
        <HireDropDown />
        <HireArticle />
      </Wrapper>
    </div>
  );
}

export default Hire;
