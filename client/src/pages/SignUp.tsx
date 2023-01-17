import React from "react";
import styled from "styled-components";
import SignUpForm from "../components/signup/SignUpForm";

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignUpPage = () => {
  return (
    <SignUpContainer>
      <SignUpForm />
    </SignUpContainer>
  );
};

export default SignUpPage;
