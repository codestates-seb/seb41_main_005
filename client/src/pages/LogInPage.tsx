import React from "react";
import styled from "styled-components";
import LogInForm from "../components/login/LogInForm";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LogInPage = () => {
  return (
    <LoginContainer>
      <LogInForm />
    </LoginContainer>
  );
};

export default LogInPage;
