import Navigation from "./components/Navigation";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/styles/global-styles";
import { theme } from "./assets/styles/theme";
import Hire from "./pages/Hire";

// import axios from "axios";
import HireDetail from "./pages/HireDetail";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navigation />
      <Hire />
      {/* <HireDetail /> */}
    </ThemeProvider>
  );
  // axios({
  //   method: "post",
  //   url: "http://gigker.iptime.org:8080/members", // https://3cd6-211-227-190-110.jp.ngrok.io/members",
  //   // data: {
  //   //   email: "email@email.com",
  //   //   nickName: "testUser",
  //   //   password: 1234,
  //   //   about: "about me!",
  //   // },
  // }).then((res) => console.log(res));
}

export default App;
