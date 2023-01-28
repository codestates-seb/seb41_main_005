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
<<<<<<< HEAD
=======
    overflow-y: scroll;
    line-height: 1.4;
>>>>>>> 63201111f2ab941dcb3284b8aa360e73701121ca
  }
  a {
    cursor: pointer;
  }
  
`;
export default GlobalStyle;
