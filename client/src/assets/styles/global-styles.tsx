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
    height: 100rem;
  }
  button {
    cursor: pointer;
  }
  
`;
export default GlobalStyle;
