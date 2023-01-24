import Navigation from "./components/Navigation";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/styles/global-styles";
import { theme } from "./assets/styles/theme";
import Main from "./pages/Main";
import Hire from "./pages/Hire";
import Hunting from "./pages/Hunting";
import EditHire from "./pages/EditHire";
import EditHunting from "./pages/EditHunting";
import NewHire from "./pages/NewHire";
import NewHunting from "./pages/NewHunting";
import HireDetail from "./pages/HireDetail";
import HuntingDetail from "./pages/HuntingDetail";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ScrollToTop from "./util/scrollRestoration";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/hunting" element={<Hunting />} />
          <Route path="/edithire" element={<EditHire />} />
          <Route path="/newhire" element={<NewHire />} />
          <Route path="/newhire" element={<NewHunting />} />
          <Route path="/edithunting" element={<EditHunting />} />
          <Route path="/hiredetail/:content_id" element={<HireDetail />} />
          <Route
            path="/huntingdetail/:content_id"
            element={<HuntingDetail />}
          />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
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
