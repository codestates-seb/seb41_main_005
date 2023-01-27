import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${Reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    overflow-y: scroll;
    line-height: 1.4;
  }
  a {
    cursor: pointer;
  }
  
`;
export default GlobalStyle;
