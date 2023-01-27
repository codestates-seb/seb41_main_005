import React from "react";
import styled from "styled-components";
import MyPageDetail from "../components/mypage/MyPageDetail";

const MypageContainer = styled.div`
  display: flex;
  margin: auto;
  max-width: 1000px;
  height: 100vh;
  padding-top: 65px;
`;

const MyPage = () => {
  return (
    <MypageContainer>
      <MyPageDetail />
    </MypageContainer>
  );
};

export default MyPage;
