import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/styles/global-styles";
import { theme } from "./assets/styles/theme";
import Navigation from "./components/Navigation";
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
import MyPage from "./pages/MyPage";
import Schedule from "./pages/Schedule";
import Review from "./pages/Review";
import ScrollToTop from "./util/scrollRestoration";
import Footer from "./components/Footer";
import { handleRefresh } from "./util/logInApi";

function App() {
  // 새로고침 시 토큰 재발급 함수 실행
  const HandleRefresh = handleRefresh();
  useEffect(() => {
    HandleRefresh;
  }, []);
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
          <Route path="/newhire" element={<NewHire />} />
          <Route path="/newhunting" element={<NewHunting />} />
          <Route path="/hiredetail/:content_id" element={<HireDetail />} />
          <Route
            path="/huntingdetail/:content_id"
            element={<HuntingDetail />}
          />
          <Route path="/edithire/:content_id" element={<EditHire />} />
          <Route path="/edithunting/:content_id" element={<EditHunting />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/review/:content_id" element={<Review />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
